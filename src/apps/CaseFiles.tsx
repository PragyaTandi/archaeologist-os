import { useEffect, useRef, useState } from 'react';
import { discoveries } from '@/data/discoveries';
import type { CaseFile } from '@/data/types';
import { fetchCaseFiles, saveCaseFiles } from '@/data/caseFilesApi';
import { PixIcon } from '@/components/PixIcon';
import { Plus, Trash2, StickyNote, FolderPlus, Search } from 'lucide-react';

const STORAGE_KEY = 'arch-os-case-files';

function loadFiles(): CaseFile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as CaseFile[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  // seed with one sample
  const sample: CaseFile[] = [
    {
      id: 'case-seed',
      title: 'Antikythera Reconstruction',
      subject: 'Investigating the Antikythera Mechanism gear train',
      status: 'Active',
      created: Date.now() - 86400000,
      updated: Date.now() - 3600000,
      notes: [
        { id: 'n1', text: 'Confirm 223-tooth count on main drive gear against Freeth 2006.', created: Date.now() - 7200000 },
      ],
      linkedDiscoveries: ['antikythera'],
      reconstructProgress: 68,
    },
  ];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sample));
  } catch {
    // ignore
  }
  return sample;
}

const STATUS_COLOR: Record<string, string> = {
  Open: '#4f8a47',
  Active: '#75c66a',
  Cold: '#b08a5a',
  Closed: '#5a6e50',
};

export function CaseFiles() {
  const [files, setFiles] = useState<CaseFile[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [syncStatus, setSyncStatus] = useState<'loading' | 'saving' | 'synced' | 'local'>('loading');
  const loaded = useRef(false);
  const selected = files.find((f) => f.id === selectedId) ?? null;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const cachedFiles = loadFiles();
      try {
        const remote = await fetchCaseFiles();
        if (cancelled) return;
        setFiles(remote.length > 0 ? remote : cachedFiles);
      } catch {
        if (cancelled) return;
        setFiles(cachedFiles);
        setSyncStatus('local');
      } finally {
        if (!cancelled) loaded.current = true;
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
    } catch {
      // ignore
    }

    const timeout = window.setTimeout(() => {
      setSyncStatus('saving');
      void saveCaseFiles(files)
        .then(() => setSyncStatus('synced'))
        .catch(() => setSyncStatus('local'));
    }, 500);

    return () => window.clearTimeout(timeout);
  }, [files]);

  const createCase = () => {
    const id = `case-${Date.now()}`;
    const newFile: CaseFile = {
      id,
      title: 'New Investigation',
      subject: 'Subject of inquiry',
      status: 'Open',
      created: Date.now(),
      updated: Date.now(),
      notes: [],
      linkedDiscoveries: [],
      reconstructProgress: 0,
    };
    setFiles((f) => [newFile, ...f]);
    setSelectedId(id);
  };

  const deleteCase = (id: string) => {
    setFiles((f) => f.filter((x) => x.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const updateCase = (id: string, patch: Partial<CaseFile>) => {
    setFiles((f) => f.map((x) => (x.id === id ? { ...x, ...patch, updated: Date.now() } : x)));
  };

  const addNote = (id: string, text: string) => {
    if (!text.trim()) return;
    setFiles((f) =>
      f.map((x) =>
        x.id === id
          ? { ...x, notes: [...x.notes, { id: `n-${Date.now()}`, text: text.trim(), created: Date.now() }], updated: Date.now() }
          : x,
      ),
    );
  };

  const deleteNote = (caseId: string, noteId: string) => {
    setFiles((f) =>
      f.map((x) => (x.id === caseId ? { ...x, notes: x.notes.filter((n) => n.id !== noteId), updated: Date.now() } : x)),
    );
  };

  const toggleDiscovery = (caseId: string, discId: string) => {
    setFiles((f) =>
      f.map((x) => {
        if (x.id !== caseId) return x;
        const has = x.linkedDiscoveries.includes(discId);
        return {
          ...x,
          linkedDiscoveries: has ? x.linkedDiscoveries.filter((d) => d !== discId) : [...x.linkedDiscoveries, discId],
          updated: Date.now(),
        };
      }),
    );
  };

  const filtered = files.filter((f) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return f.title.toLowerCase().includes(q) || f.subject.toLowerCase().includes(q);
  });

  return (
    <div className="flex h-full">
      {/* Case list */}
      <div className="w-60 flex flex-col border-r border-green-black/40" style={{ background: 'var(--paper-dark)' }}>
        <div className="p-2 border-b border-green-black/40 flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <PixIcon glyph="cases" size={16} />
            <span className="font-bold text-[12px] text-deep-green">CASE FILES</span>
          </div>
          <div className="text-[9px] font-mono text-deep-green/60" role="status" aria-live="polite">
            {syncStatus === 'loading' && 'LOADING CASES'}
            {syncStatus === 'saving' && 'SAVING TO ARCHIVE'}
            {syncStatus === 'synced' && 'SYNCED TO ARCHIVE'}
            {syncStatus === 'local' && 'LOCAL COPY — SERVER UNAVAILABLE'}
          </div>
          <div className="flex items-center gap-1 panel-inset px-1">
            <Search size={11} className="text-deep-green/70" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search files…"
              className="bg-transparent flex-1 py-0.5 text-[11px] outline-none text-deep-green placeholder:text-deep-green/40 selectable"
            />
          </div>
          <button onClick={createCase} className="btn-raised flex items-center gap-1 justify-center py-1 text-[11px]">
            <Plus size={12} /> New Case
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-[11px] text-deep-green/50">No case files.</div>
          ) : (
            filtered.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedId(f.id)}
                className={`w-full text-left px-2 py-1.5 border-b border-green-black/10 ${
                  selectedId === f.id ? 'bg-win-title/60' : 'hover:bg-win-title/30'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ background: STATUS_COLOR[f.status] }} />
                  <span className="font-bold text-[11px] text-deep-green truncate">{f.title}</span>
                </div>
                <div className="text-[9px] text-deep-green/60 mt-0.5">
                  {f.linkedDiscoveries.length} links · {f.notes.length} notes
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Detail */}
      <div className="flex-1 overflow-auto">
        {selected ? (
          <CaseDetail
            file={selected}
            onUpdate={(patch) => updateCase(selected.id, patch)}
            onAddNote={(text) => addNote(selected.id, text)}
            onDeleteNote={(nid) => deleteNote(selected.id, nid)}
            onDeleteCase={() => deleteCase(selected.id)}
            onToggleDiscovery={(did) => toggleDiscovery(selected.id, did)}
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-2 text-deep-green/50">
            <FolderPlus size={40} />
            <span className="text-[12px]">Select a case file or create a new investigation.</span>
          </div>
        )}
      </div>
    </div>
  );
}

function CaseDetail({
  file,
  onUpdate,
  onAddNote,
  onDeleteNote,
  onDeleteCase,
  onToggleDiscovery,
}: {
  file: CaseFile;
  onUpdate: (patch: Partial<CaseFile>) => void;
  onAddNote: (text: string) => void;
  onDeleteNote: (id: string) => void;
  onDeleteCase: () => void;
  onToggleDiscovery: (discId: string) => void;
}) {
  const [noteDraft, setNoteDraft] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-3 h-full overflow-auto">
      <div className="paper-sheet paper-edge p-3">
        <div className="flex items-start justify-between gap-2 border-b border-ink/20 pb-2 mb-3">
          <div className="flex-1">
            <input
              ref={titleRef}
              value={file.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
              className="font-serif-hist text-xl text-ink bg-transparent w-full outline-none border-b border-transparent focus:border-ink/40 selectable"
            />
            <input
              value={file.subject}
              onChange={(e) => onUpdate({ subject: e.target.value })}
              className="font-mono text-[11px] text-ink/70 bg-transparent w-full outline-none mt-0.5 selectable"
            />
            <div className="flex items-center gap-2 mt-2 text-[10px] font-mono">
              <label className="flex items-center gap-1">
                Status:
                <select
                  value={file.status}
                  onChange={(e) => onUpdate({ status: e.target.value as CaseFile['status'] })}
                  className="panel-inset px-1 py-0.5 bg-paper text-deep-green"
                >
                  <option>Open</option>
                  <option>Active</option>
                  <option>Cold</option>
                  <option>Closed</option>
                </select>
              </label>
              <span className="text-ink/50">| Opened {new Date(file.created).toLocaleDateString()}</span>
            </div>
          </div>
          <button onClick={onDeleteCase} className="btn-raised flex items-center gap-1 px-2 py-1 text-[10px] text-deep-green">
            <Trash2 size={12} /> Delete
          </button>
        </div>

        {/* Progress */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-[10px] font-mono text-deep-green mb-1">
            <span>RECONSTRUCTION PROGRESS</span>
            <span className="tabular-nums">{file.reconstructProgress}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={file.reconstructProgress}
            onChange={(e) => onUpdate({ reconstructProgress: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        {/* Linked discoveries */}
        <div className="mb-3">
          <h3 className="font-mono text-[11px] text-deep-green font-bold uppercase border-b border-deep-green/30 mb-1.5 pb-0.5">
            Linked Discoveries
          </h3>
          <div className="grid grid-cols-2 gap-1.5">
            {discoveries.map((d) => {
              const linked = file.linkedDiscoveries.includes(d.id);
              return (
                <button
                  key={d.id}
                  onClick={() => onToggleDiscovery(d.id)}
                  className={`flex items-center gap-2 px-1.5 py-1 text-left text-[10px] border ${
                    linked ? 'bg-deep-green/10 border-deep-green' : 'border-ink/20 hover:bg-paper-dark'
                  }`}
                >
                  <PixIcon glyph={d.glyph} size={20} />
                  <span className="text-ink truncate">{d.name}</span>
                  {linked && <span className="ml-auto text-deep-green">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div>
          <h3 className="font-mono text-[11px] text-deep-green font-bold uppercase border-b border-deep-green/30 mb-1.5 pb-0.5 flex items-center gap-1">
            <StickyNote size={12} /> Research Notes
          </h3>
          <div className="flex items-center gap-1 mb-2">
            <input
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onAddNote(noteDraft);
                  setNoteDraft('');
                }
              }}
              placeholder="add a research note…"
              className="panel-inset flex-1 px-2 py-1 text-[11px] outline-none bg-paper text-ink selectable"
            />
            <button
              onClick={() => {
                onAddNote(noteDraft);
                setNoteDraft('');
              }}
              className="btn-raised flex items-center gap-1 px-2 py-1 text-[11px] text-deep-green"
            >
              <Plus size={12} /> Add
            </button>
          </div>
          <div className="space-y-1.5 max-h-48 overflow-auto">
            {file.notes.length === 0 ? (
              <div className="text-[11px] text-ink/50 italic">No notes yet.</div>
            ) : (
              file.notes
                .slice()
                .reverse()
                .map((n) => (
                  <div key={n.id} className="panel-inset p-2 flex items-start gap-2" style={{ background: '#f0e9d4' }}>
                    <StickyNote size={12} className="text-ink/60 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-mono text-[11px] text-ink selectable">{n.text}</div>
                      <div className="text-[9px] text-ink/50">{new Date(n.created).toLocaleString()}</div>
                    </div>
                    <button onClick={() => onDeleteNote(n.id)} className="text-ink/50 hover:text-deep-green">
                      <Trash2 size={11} />
                    </button>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
