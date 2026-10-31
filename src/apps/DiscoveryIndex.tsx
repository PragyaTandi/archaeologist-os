import { useMemo, useState } from 'react';
import { discoveries, discoveryCategories } from '@/data/discoveries';
import type { Discovery, EvidenceStatus } from '@/data/types';
import { PixIcon } from '@/components/PixIcon';
import { Search, Filter, X } from 'lucide-react';

const EVIDENCE_COLORS: Record<EvidenceStatus, string> = {
  Verified: '#4f8a47',
  Disputed: '#d97742',
  Fragmentary: '#b08a5a',
  Lost: '#8a4a3a',
};

interface DiscoveryIndexProps {
  /** open a detail sub-window for a discovery */
  onOpenDiscovery: (id: string) => void;
}

export function DiscoveryIndex({ onOpenDiscovery }: DiscoveryIndexProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return discoveries.filter((d) => {
      if (category !== 'All' && d.category !== category) return false;
      if (!q) return true;
      return (
        d.name.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q) ||
        d.period.toLowerCase().includes(q) ||
        d.summary.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  return (
    <div className="flex h-full">
      {/* Sidebar: list */}
      <div className="w-72 flex flex-col border-r border-green-black/40" style={{ background: 'var(--paper-dark)' }}>
        <div className="p-2 border-b border-green-black/40">
          <div className="flex items-center gap-1 mb-2">
            <PixIcon glyph="discovery" size={18} />
            <span className="font-bold text-[13px] text-deep-green">DISCOVERY INDEX</span>
          </div>
          <div className="flex items-center gap-1 panel-inset px-1">
            <Search size={12} className="text-deep-green/70" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search discoveries..."
              className="bg-transparent flex-1 py-1 text-[12px] outline-none text-deep-green placeholder:text-deep-green/40 selectable"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-deep-green/60 hover:text-deep-green">
                <X size={12} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-1 mt-2">
            <Filter size={12} className="text-deep-green/70" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="panel-inset text-[11px] py-0.5 px-1 flex-1 outline-none bg-paper-dark text-deep-green selectable"
            >
              {discoveryCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="text-[10px] text-deep-green/60 mt-1">
            {filtered.length} / {discoveries.length} records
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-[11px] text-deep-green/50">No discoveries match.</div>
          ) : (
            filtered.map((d) => (
              <button
                key={d.id}
                onClick={() => onOpenDiscovery(d.id)}
                className="w-full text-left flex items-start gap-2 px-2 py-1.5 border-b border-green-black/10 hover:bg-win-title/40"
              >
                <PixIcon glyph={d.glyph} size={28} style={{ flexShrink: 0, marginTop: 1 }} />
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-[12px] text-deep-green truncate">{d.name}</div>
                  <div className="text-[10px] text-deep-green/70 truncate">{d.region}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className="px-1 text-[9px] font-mono uppercase"
                      style={{ background: EVIDENCE_COLORS[d.evidence], color: '#fff' }}
                    >
                      {d.evidence}
                    </span>
                    <span className="text-[9px] text-deep-green/50 truncate">{d.dateRange}</span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main: featured grid */}
      <div className="flex-1 overflow-auto p-3">
        <div className="font-serif-hist text-deep-green text-xl mb-1">The Forgotten Technologies Codex</div>
        <div className="text-[11px] text-deep-green/60 mb-3 font-mono">
          An interactive catalogue of lost, overlooked, and ancient technologies — compiled by Helios Historical Research Labs.
        </div>
        <div className="grid grid-cols-2 gap-2">
          {filtered.map((d) => (
            <button
              key={d.id}
              onClick={() => onOpenDiscovery(d.id)}
              className="paper-sheet paper-edge text-left p-2.5 hover:translate-x-[1px] hover:translate-y-[1px] transition-transform"
            >
              <div className="flex items-start gap-2">
                <div className="panel-inset p-1 flex-shrink-0">
                  <PixIcon glyph={d.glyph} size={42} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-serif-hist text-[15px] text-ink leading-tight">{d.name}</div>
                  <div className="text-[10px] text-ink/70 font-mono">{d.region} — {d.dateRange}</div>
                  <div className="mt-1 flex items-center gap-1">
                    <span
                      className="px-1 text-[9px] font-mono uppercase"
                      style={{ background: EVIDENCE_COLORS[d.evidence], color: '#fff' }}
                    >
                      {d.evidence}
                    </span>
                    <span className="text-[9px] text-ink/60">{d.category}</span>
                  </div>
                  <p className="text-[10px] text-ink/80 mt-1 leading-snug line-clamp-2">{d.summary}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DiscoveryDetail({ discovery }: { discovery: Discovery }) {
  const d = discovery;
  return (
    <div className="h-full overflow-auto">
      <div className="paper-sheet p-4 m-3">
        <div className="flex items-start gap-3 mb-3 border-b border-ink/20 pb-3">
          <div className="panel-inset p-2 flex-shrink-0">
            <PixIcon glyph={d.glyph} size={64} />
          </div>
          <div className="flex-1">
            <h2 className="font-serif-hist text-2xl text-ink leading-tight">{d.name}</h2>
            <div className="text-[12px] text-ink/70 font-mono mt-0.5">
              {d.region} · {d.period} · {d.dateRange}
            </div>
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span
                className="px-1.5 py-0.5 text-[10px] font-mono uppercase"
                style={{ background: EVIDENCE_COLORS[d.evidence], color: '#fff' }}
              >
                Evidence: {d.evidence}
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono bg-deep-green text-paper">
                {d.category}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 font-mono text-[11px]">
          <Field label="Geographic Origin" value={d.region} />
          <Field label="Historical Period" value={d.period} />
          <Field label="Estimated Date" value={d.dateRange} />
          <Field label="Category" value={d.category} />
          <Field label="Evidence Status" value={d.evidence} />
          <Field label="Technology Class" value={d.category} />
        </div>

        <Section title="Historical Significance">
          <p className="font-serif-hist text-ink text-[14px] leading-relaxed selectable">{d.significance}</p>
        </Section>

        <Section title="Known Operating Principles">
          <p className="font-mono text-[11px] text-ink/90 leading-relaxed selectable">{d.principles}</p>
        </Section>

        <Section title="Description">
          {d.description.map((p, i) => (
            <p key={i} className="font-serif-hist text-ink text-[13.5px] leading-relaxed mb-2 selectable">
              {p}
            </p>
          ))}
        </Section>

        <Section title="Document References">
          <ol className="font-mono text-[11px] text-ink/85 list-decimal pl-5 space-y-0.5 selectable">
            {d.references.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ol>
        </Section>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[9px] uppercase tracking-wide text-deep-green/60">{label}</span>
      <span className="panel-inset px-1.5 py-0.5 text-deep-green">{value}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <h3 className="font-serif-hist text-[16px] text-deep-green border-b border-deep-green/30 mb-1.5 pb-0.5">
        {title}
      </h3>
      {children}
    </div>
  );
}
