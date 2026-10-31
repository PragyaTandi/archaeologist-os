import type { CaseFile } from '@/data/types';

async function request<T>(init?: RequestInit): Promise<T> {
  const response = await fetch('/api/cases', {
    ...init,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Case-file API returned ${response.status}.`);
  }

  return response.json() as Promise<T>;
}

export async function fetchCaseFiles(): Promise<CaseFile[]> {
  const result = await request<{ files: CaseFile[] }>();
  return result.files;
}

export async function saveCaseFiles(files: CaseFile[]): Promise<void> {
  await request<{ saved: boolean }>({
    method: 'PUT',
    body: JSON.stringify({ files }),
  });
}