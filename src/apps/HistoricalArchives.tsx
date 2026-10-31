import { useMemo, useState } from 'react';
import { archiveDocs, archiveCategories } from '@/data/archives';
import type { ArchiveDoc } from '@/data/types';
import { PixIcon } from '@/components/PixIcon';
import { Search, FileText, X } from 'lucide-react';

export function HistoricalArchives() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<ArchiveDoc | null>(archiveDocs[0]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return archiveDocs.filter((d) => {
      if (category !== 'All' && d.category !== category) return false;
      if (!q) return true;
      return (
        d.title.toLowerCase().includes(q) ||
        d.author.toLowerCase().includes(q) ||
        d.abstract.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  return (
    <div className="flex h-full">
      {/* Catalogue sidebar */}
      <div className="w-72 flex flex-col border-r border-green-black/40" style={{ background: 'var(--paper-dark)' }}>
        <div className="p-2 border-b border-green-black/40">
          <div className="flex items-center gap-1 mb-2">
            <PixIcon glyph="archives" size={18} />
            <span className="font-bold text-[13px] text-deep-green">HISTORICAL ARCHIVES</span>
          </div>
          <div className="flex items-center gap-1 panel-inset px-1">
            <Search size={12} className="text-deep-green/70" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search catalogue..."
              className="bg-transparent flex-1 py-1 text-[12px] outline-none text-deep-green placeholder:text-deep-green/40 selectable"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-deep-green/60 hover:text-deep-green">
                <X size={12} />
              </button>
            )}
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="panel-inset mt-2 text-[11px] py-0.5 px-1 w-full outline-none bg-paper-dark text-deep-green"
          >
            {archiveCategories.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 overflow-auto">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-[11px] text-deep-green/50">No documents match.</div>
          ) : (
            filtered.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelected(d)}
                className={`w-full text-left flex items-start gap-2 px-2 py-1.5 border-b border-green-black/10 ${
                  selected?.id === d.id ? 'bg-win-title/60' : 'hover:bg-win-title/30'
                }`}
              >
                <PixIcon glyph={d.glyph} size={24} style={{ flexShrink: 0, marginTop: 1 }} />
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-[11px] text-deep-green truncate">{d.title}</div>
                  <div className="text-[10px] text-deep-green/70 truncate">{d.author}</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="px-1 text-[8px] bg-deep-green text-paper uppercase font-mono">{d.category}</span>
                    {d.fiction && (
                      <span className="px-1 text-[8px] bg-d97742 text-white uppercase font-mono" style={{ background: '#d97742', color: '#fff' }}>
                        DEMO
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Document viewer */}
      <div className="flex-1 overflow-auto p-3">
        {selected ? (
          <DocViewer doc={selected} />
        ) : (
          <div className="h-full flex items-center justify-center text-deep-green/50 text-[12px]">
            Select a document from the catalogue.
          </div>
        )}
      </div>
    </div>
  );
}

function DocViewer({ doc }: { doc: ArchiveDoc }) {
  return (
    <div className="paper-sheet paper-edge p-4">
      <div className="flex items-start justify-between gap-3 border-b border-ink/20 pb-3 mb-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="panel-inset p-2 flex-shrink-0">
            <PixIcon glyph={doc.glyph} size={48} />
          </div>
          <div>
            <h2 className="font-serif-hist text-xl text-ink leading-tight">{doc.title}</h2>
            <div className="text-[11px] text-ink/70 font-mono mt-0.5">{doc.author}</div>
            {doc.fiction && (
              <div className="mt-1 px-1.5 py-0.5 inline-block text-[9px] font-mono uppercase" style={{ background: '#d97742', color: '#fff' }}>
                Fictional sample document — demonstration only
              </div>
            )}
          </div>
        </div>
        <FileText size={20} className="text-ink/40 flex-shrink-0" />
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3 font-mono text-[10px]">
        <Meta label="Year" value={doc.year} />
        <Meta label="Period" value={doc.period} />
        <Meta label="Language" value={doc.language} />
        <Meta label="Pages" value={String(doc.pages)} />
        <Meta label="Category" value={doc.category} />
        <Meta label="Reference" value={doc.id.toUpperCase()} />
      </div>

      <h3 className="font-serif-hist text-[15px] text-deep-green border-b border-deep-green/30 mb-1.5 pb-0.5">
        Abstract
      </h3>
      <p className="font-serif-hist text-ink text-[14px] leading-relaxed mb-4 selectable">{doc.abstract}</p>

      {/* Simulated page preview */}
      <h3 className="font-serif-hist text-[15px] text-deep-green border-b border-deep-green/30 mb-1.5 pb-0.5">
        Document Preview
      </h3>
      <div className="panel-inset p-3" style={{ background: '#f0e9d4' }}>
        <div className="flex gap-2">
          <div className="flex-1 border-r border-ink/20 pr-3">
            <div className="font-serif-pica text-ink text-[13px] leading-relaxed space-y-2">
              <p className="font-serif-hist text-[16px] text-center mb-2">
                — Folio I —
              </p>
              <p className="indent-6 selectable">{doc.abstract}</p>
              <p className="indent-6 selectable">
                Notes on provenance: this record was catalogued under the {doc.category.toLowerCase()} classification and cross-referenced with period {doc.period} material. {doc.fiction ? 'As a demonstration document, the text below is illustrative.' : ''}
              </p>
              <p className="indent-6 selectable">
                Comparative analysis suggests the methodology described herein aligns with contemporaneous engineering practice. Pending verification by the reconstruction lab, the operating principles remain as recorded in the original source.
              </p>
            </div>
          </div>
          <div className="w-32 flex flex-col items-center gap-1">
            <div className="panel-inset w-full aspect-[3/4] flex items-center justify-center" style={{ background: '#e8e0c9' }}>
              <PixIcon glyph={doc.glyph} size={56} />
            </div>
            <span className="text-[9px] font-mono text-ink/60 text-center">Plate 1 — illustrative</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[9px] uppercase tracking-wide text-deep-green/60">{label}</span>
      <span className="panel-inset px-1.5 py-0.5 text-deep-green truncate">{value}</span>
    </div>
  );
}
