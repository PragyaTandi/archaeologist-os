import { useState } from 'react';
import { reconstructionTechs } from '@/data/reconstructions';
import type { ReconstructionTech } from '@/data/types';
import { PixIcon } from '@/components/PixIcon';

export function ReconstructionLab() {
  const [selectedId, setSelectedId] = useState(reconstructionTechs[0].id);
  const tech = reconstructionTechs.find((t) => t.id === selectedId) ?? reconstructionTechs[0];

  return (
    <div className="flex h-full">
      {/* Tech selector */}
      <div className="w-48 flex flex-col border-r border-green-black/40" style={{ background: 'var(--paper-dark)' }}>
        <div className="p-2 border-b border-green-black/40">
          <div className="flex items-center gap-1">
            <PixIcon glyph="lab" size={16} />
            <span className="font-bold text-[12px] text-deep-green">PROJECTS</span>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {reconstructionTechs.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedId(t.id)}
              className={`w-full text-left px-2 py-1.5 border-b border-green-black/10 text-[11px] ${
                t.id === selectedId ? 'bg-win-title/60 font-bold' : 'hover:bg-win-title/30'
              }`}
            >
              <div className="text-deep-green truncate">{t.name}</div>
              <div className="flex items-center gap-1 mt-1">
                <div className="flex-1 h-2 panel-inset">
                  <div
                    className="h-full"
                    style={{ width: `${t.progress}%`, background: t.progress > 60 ? '#4f8a47' : '#b08a5a' }}
                  />
                </div>
                <span className="text-[9px] text-deep-green/70 tabular-nums">{t.progress}%</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <LabHeader tech={tech} />
        <div className="flex-1 flex overflow-hidden">
          <LabLeftPane tech={tech} />
          <LabRightPane tech={tech} />
        </div>
      </div>
    </div>
  );
}

function LabHeader({ tech }: { tech: ReconstructionTech }) {
  return (
    <div className="px-3 py-2 border-b border-green-black flex items-center gap-3" style={{ background: 'var(--win-title)' }}>
      <PixIcon glyph="lab" size={22} />
      <div>
        <div className="font-bold text-[13px] text-green-black">{tech.name}</div>
        <div className="text-[10px] text-deep-green">Reconstruction Project — Helios Labs</div>
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-2 text-[10px] font-mono">
        <span className="text-deep-green">PROGRESS:</span>
        <div className="w-32 h-3 panel-inset">
          <div
            className="h-full"
            style={{ width: `${tech.progress}%`, background: tech.progress > 60 ? '#4f8a47' : '#b08a5a' }}
          />
        </div>
        <span className="text-deep-green font-bold tabular-nums">{tech.progress}%</span>
      </div>
    </div>
  );
}

function LabLeftPane({ tech }: { tech: ReconstructionTech }) {
  return (
    <div className="w-1/2 overflow-auto p-3 border-r border-green-black/40" style={{ background: 'var(--win-bg)' }}>
      <Section title="Technology Overview">
        <p className="text-[11px] text-deep-green leading-relaxed selectable">{tech.overview}</p>
      </Section>

      <Section title="Historical Construction Methods">
        <ul className="text-[11px] text-deep-green space-y-0.5 list-disc pl-4">
          {tech.methods.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </Section>

      <Section title="Required Materials">
        <table className="w-full text-[10px] font-mono border border-green-black/40">
          <thead className="bg-win-title/60 text-deep-green">
            <tr>
              <th className="text-left px-1.5 py-0.5 border-r border-green-black/30">Material</th>
              <th className="text-left px-1.5 py-0.5 border-r border-green-black/30">Spec</th>
              <th className="text-left px-1.5 py-0.5">Note</th>
            </tr>
          </thead>
          <tbody>
            {tech.materials.map((m, i) => (
              <tr key={i} className="border-t border-green-black/20">
                <td className="px-1.5 py-0.5 border-r border-green-black/20 text-deep-green font-bold">{m.name}</td>
                <td className="px-1.5 py-0.5 border-r border-green-black/20 text-deep-green/80">{m.spec}</td>
                <td className="px-1.5 py-0.5 text-deep-green/70">{m.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Engineering Principles">
        <ul className="text-[11px] text-deep-green space-y-0.5 list-disc pl-4">
          {tech.principles.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </Section>

      <Section title="Build Instructions">
        <ol className="text-[11px] text-deep-green space-y-0.5 list-decimal pl-4">
          {tech.buildSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </Section>
    </div>
  );
}

const STATUS_COLOR: Record<string, string> = {
  Complete: '#4f8a47',
  'In Progress': '#b08a5a',
  Hypothetical: '#d97742',
};

function LabRightPane({ tech }: { tech: ReconstructionTech }) {
  return (
    <div className="w-1/2 flex flex-col overflow-hidden" style={{ background: '#0e2f20' }}>
      <div className="px-3 py-1 border-b border-green-black flex items-center justify-between" style={{ background: 'var(--win-title)' }}>
        <span className="font-mono text-[10px] text-deep-green font-bold">CAD VIEWPORT — {tech.name.toUpperCase()}</span>
        <span className="font-mono text-[9px] text-deep-green/70">SCALE 1:1 · UNITS mm</span>
      </div>

      {/* Schematic preview */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center"
        style={{
          backgroundColor: '#0e2f20',
          backgroundImage:
            'linear-gradient(rgba(117,198,106,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(117,198,106,0.12) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      >
        <CadSchematic tech={tech} />
        <div className="absolute top-1 left-2 font-mono text-[9px] text-phosphor/70">VIEW: ORTHO</div>
        <div className="absolute bottom-1 right-2 font-mono text-[9px] text-phosphor/70">{tech.components.length} COMPONENTS</div>
      </div>

      {/* Component breakdown */}
      <div className="h-44 overflow-auto border-t border-green-black" style={{ background: 'var(--paper-dark)' }}>
        <div className="px-2 py-1 sticky top-0 font-mono text-[10px] text-deep-green font-bold border-b border-green-black/30" style={{ background: 'var(--win-title)' }}>
          COMPONENT BREAKDOWN
        </div>
        <table className="w-full text-[10px] font-mono">
          <thead className="text-deep-green/80 sticky top-[18px]">
            <tr style={{ background: 'var(--paper)' }}>
              <th className="text-left px-1.5 py-0.5">ID</th>
              <th className="text-left px-1.5 py-0.5">Component</th>
              <th className="text-left px-1.5 py-0.5">Role</th>
              <th className="text-left px-1.5 py-0.5">Material</th>
              <th className="text-left px-1.5 py-0.5">Status</th>
            </tr>
          </thead>
          <tbody>
            {tech.components.map((c) => (
              <tr key={c.id} className="border-t border-green-black/20">
                <td className="px-1.5 py-0.5 text-deep-green/60">{c.id.toUpperCase()}</td>
                <td className="px-1.5 py-0.5 text-deep-green font-bold">{c.name}</td>
                <td className="px-1.5 py-0.5 text-deep-green/80">{c.role}</td>
                <td className="px-1.5 py-0.5 text-deep-green/80">{c.material}</td>
                <td className="px-1.5 py-0.5">
                  <span
                    className="px-1 py-0.5 text-[9px] uppercase"
                    style={{ background: STATUS_COLOR[c.status], color: '#fff' }}
                  >
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CadSchematic({ tech }: { tech: ReconstructionTech }) {
  // Different schematic per tech id
  if (tech.id === 'antikythera') {
    return (
      <svg width="260" height="260" viewBox="0 0 260 260" style={{ filter: 'drop-shadow(0 0 6px rgba(117,198,106,0.3))' }}>
        <g stroke="#75c66a" fill="none" strokeWidth="1.2">
          <circle cx="130" cy="130" r="120" />
          <circle cx="130" cy="130" r="90" />
          <circle cx="130" cy="130" r="55" />
          <circle cx="130" cy="130" r="22" />
        </g>
        {/* teeth ticks */}
        {Array.from({ length: 48 }).map((_, i) => {
          const a = (i / 48) * Math.PI * 2;
          return <line key={i} x1={130 + 118 * Math.cos(a)} y1={130 + 118 * Math.sin(a)} x2={130 + 122 * Math.cos(a)} y2={130 + 122 * Math.sin(a)} stroke="#75c66a" strokeWidth="0.8" />;
        })}
        {Array.from({ length: 36 }).map((_, i) => {
          const a = (i / 36) * Math.PI * 2;
          return <line key={i} x1={130 + 88 * Math.cos(a)} y1={130 + 88 * Math.sin(a)} x2={130 + 92 * Math.cos(a)} y2={130 + 92 * Math.sin(a)} stroke="#75c66a" strokeWidth="0.8" />;
        })}
        {/* secondary gear */}
        <g stroke="#a8d8a0" fill="none" strokeWidth="1">
          <circle cx="190" cy="80" r="30" />
          {Array.from({ length: 18 }).map((_, i) => {
            const a = (i / 18) * Math.PI * 2;
            return <line key={i} x1={190 + 28 * Math.cos(a)} y1={80 + 28 * Math.sin(a)} x2={190 + 32 * Math.cos(a)} y2={80 + 32 * Math.sin(a)} stroke="#a8d8a0" strokeWidth="0.8" />;
          })}
        </g>
        <circle cx="130" cy="130" r="3" fill="#75c66a" />
        <text x="130" y="250" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#75c66a" opacity="0.8">
          ANTIKYTHERA GEAR ASSEMBLY — b1 + mean sun train
        </text>
      </svg>
    );
  }
  if (tech.id === 'aeolipile') {
    return (
      <svg width="260" height="260" viewBox="0 0 260 260" style={{ filter: 'drop-shadow(0 0 6px rgba(117,198,106,0.3))' }}>
        <g stroke="#75c66a" fill="none" strokeWidth="1.3">
          <circle cx="130" cy="110" r="55" />
          <line x1="130" y1="55" x2="130" y2="165" />
          <path d="M75 110 L40 90 M185 110 L220 90" />
          <path d="M40 90 L25 110 M220 90 L235 110" />
        </g>
        <rect x="110" y="170" width="40" height="50" fill="none" stroke="#75c66a" strokeWidth="1.3" />
        <path d="M130 220 Q120 240 115 250 M130 220 Q140 240 145 250" stroke="#d97742" fill="none" strokeWidth="1" opacity="0.7" />
        <text x="130" y="250" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#75c66a" opacity="0.8">
          AEOLIPILE — SPHERE + BOILER ASSEMBLY
        </text>
      </svg>
    );
  }
  // concrete
  return (
    <svg width="260" height="260" viewBox="0 0 260 260" style={{ filter: 'drop-shadow(0 0 6px rgba(117,198,106,0.3))' }}>
      <g stroke="#75c66a" fill="none" strokeWidth="1.3">
        <path d="M30 200 L230 200 L230 210 L30 210 Z" />
        <path d="M40 200 L70 60 L200 60 L230 200" />
        <path d="M70 200 L90 90 L180 90 L200 200" />
        <line x1="70" y1="60" x2="70" y2="200" />
        <line x1="200" y1="60" x2="200" y2="200" />
        <circle cx="130" cy="90" r="10" />
      </g>
      <text x="130" y="120" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#a8d8a0">OCULUS</text>
      <text x="130" y="250" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#75c66a" opacity="0.8">
        ROMAN CONCRETE — DOME GRADATION
      </text>
    </svg>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <h3 className="font-mono text-[11px] text-deep-green font-bold uppercase tracking-wide border-b border-green-black/30 mb-1 pb-0.5">
        {title}
      </h3>
      {children}
    </div>
  );
}
