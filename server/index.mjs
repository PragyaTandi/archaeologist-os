import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { access, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const port = Number(process.env.PORT ?? 10000);
const sessionSecret = process.env.SESSION_SECRET;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const cookieName = 'arch_visitor';
const maxBodyBytes = 1024 * 1024;
const oneYearSeconds = 60 * 60 * 24 * 365;

if (!sessionSecret || !supabaseUrl || !supabaseServiceKey) {
  console.error('Set SESSION_SECRET, SUPABASE_URL, and SUPABASE_SERVICE_ROLE_KEY before starting the server.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function sendJson(response, status, value, headers = {}) {
  response.writeHead(status, {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    ...headers,
  });
  response.end(JSON.stringify(value));
}

function sessionSignature(visitorId) {
  return createHmac('sha256', sessionSecret).update(visitorId).digest('hex');
}

function visitorIdFor(request, response) {
  const cookies = request.headers.cookie?.split(';') ?? [];
  const entry = cookies.map((cookie) => cookie.trim()).find((cookie) => cookie.startsWith(`${cookieName}=`));
  const token = entry?.slice(cookieName.length + 1).split('.');

  if (token?.length === 2 && /^[0-9a-f-]{36}$/i.test(token[0]) && /^[0-9a-f]{64}$/i.test(token[1])) {
    const expected = Buffer.from(sessionSignature(token[0]));
    const actual = Buffer.from(token[1]);
    if (timingSafeEqual(expected, actual)) return token[0];
  }

  const visitorId = randomUUID();
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  response.setHeader(
    'Set-Cookie',
    `${cookieName}=${visitorId}.${sessionSignature(visitorId)}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${oneYearSeconds}${secure}`,
  );
  return visitorId;
}

function isCaseFile(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.subject === 'string' &&
    ['Open', 'Active', 'Cold', 'Closed'].includes(value.status) &&
    Number.isFinite(value.created) &&
    Number.isFinite(value.updated) &&
    Array.isArray(value.notes) &&
    value.notes.every(
      (note) =>
        note !== null &&
        typeof note === 'object' &&
        typeof note.id === 'string' &&
        typeof note.text === 'string' &&
        Number.isFinite(note.created),
    ) &&
    Array.isArray(value.linkedDiscoveries) &&
    value.linkedDiscoveries.every((id) => typeof id === 'string') &&
    Number.isFinite(value.reconstructProgress) &&
    value.reconstructProgress >= 0 &&
    value.reconstructProgress <= 100
  );
}

async function readJsonBody(request) {
  const chunks = [];
  let size = 0;

  for await (const chunk of request) {
    size += chunk.length;
    if (size > maxBodyBytes) {
      const error = new Error('Request body is too large.');
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    const error = new Error('Request body must be valid JSON.');
    error.statusCode = 400;
    throw error;
  }
}

async function handleApi(request, response, pathname) {
  if (pathname === '/api/health' && request.method === 'GET') {
    sendJson(response, 200, { status: 'ok' });
    return;
  }

  if (pathname !== '/api/cases') {
    sendJson(response, 404, { error: 'Not found.' });
    return;
  }

  if (request.method === 'GET') {
    const visitorId = visitorIdFor(request, response);
    const { data, error } = await supabase
      .from('case_file_sets')
      .select('files')
      .eq('visitor_id', visitorId)
      .maybeSingle();

    if (error) throw error;
    sendJson(response, 200, { files: Array.isArray(data?.files) ? data.files : [] });
    return;
  }

  if (request.method === 'PUT') {
    const body = await readJsonBody(request);
    if (body === null || typeof body !== 'object' || !Array.isArray(body.files) || !body.files.every(isCaseFile)) {
      sendJson(response, 400, { error: 'Invalid case-file collection.' });
      return;
    }

    const visitorId = visitorIdFor(request, response);
    const { error } = await supabase.from('case_file_sets').upsert(
      { visitor_id: visitorId, files: body.files, updated_at: new Date().toISOString() },
      { onConflict: 'visitor_id' },
    );

    if (error) throw error;
    sendJson(response, 200, { saved: true });
    return;
  }

  sendJson(response, 405, { error: 'Method not allowed.' }, { Allow: 'GET, PUT' });
}

async function serveFrontend(request, response, pathname) {
  if (!['GET', 'HEAD'].includes(request.method)) {
    sendJson(response, 405, { error: 'Method not allowed.' }, { Allow: 'GET, HEAD' });
    return;
  }

  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    sendJson(response, 400, { error: 'Invalid path.' });
    return;
  }

  const requestedFile = path.resolve(distDir, `.${decodedPath}`);
  if (requestedFile !== distDir && !requestedFile.startsWith(`${distDir}${path.sep}`)) {
    sendJson(response, 403, { error: 'Forbidden.' });
    return;
  }

  let filePath = requestedFile;
  try {
    await access(filePath);
    if ((await stat(filePath)).isDirectory()) filePath = path.join(filePath, 'index.html');
    await access(filePath);
  } catch {
    filePath = path.join(distDir, 'index.html');
  }

  try {
    const fileStat = await stat(filePath);
    response.writeHead(200, {
      'Cache-Control': filePath.endsWith('index.html') ? 'no-cache' : 'public, max-age=31536000, immutable',
      'Content-Length': fileStat.size,
      'Content-Type': mimeTypes[path.extname(filePath)] ?? 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    });
    if (request.method === 'HEAD') response.end();
    else createReadStream(filePath).pipe(response);
  } catch {
    sendJson(response, 503, { error: 'Frontend build is missing. Run npm run build first.' });
  }
}

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url ?? '/', 'http://localhost').pathname;
  try {
    if (pathname.startsWith('/api/')) await handleApi(request, response, pathname);
    else await serveFrontend(request, response, pathname);
  } catch (error) {
    if (response.headersSent) {
      response.destroy();
      return;
    }
    const statusCode = Number.isInteger(error?.statusCode) ? error.statusCode : 500;
    sendJson(response, statusCode, {
      error: statusCode === 500 ? 'The request could not be completed.' : error.message,
    });
    if (statusCode === 500) console.error(error);
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Archaeologist OS server listening on port ${port}`);
});