import type { AppId } from '@/os/useWindowManager';
import { PixIcon } from '@/components/PixIcon';

interface LauncherMenuProps {
  onOpen: (app: AppId) => void;
  onClose: () => void;
}

const ITEMS: { app: AppId; glyph: string; label: string; desc: string }[] = [
  { app: 'discovery', glyph: 'discovery', label: 'Discovery Index', desc: 'Browse forgotten technologies' },
  { app: 'archives', glyph: 'archives', label: 'Historical Archives', desc: 'Manuscripts & blueprints' },
  { app: 'lab', glyph: 'lab', label: 'Reconstruction Lab', desc: 'Engineering breakdowns' },
  { app: 'simulation', glyph: 'simulation', label: 'Simulation Chamber', desc: 'Interactive models' },
  { app: 'gemma', glyph: 'gemma', label: 'Gemma Assistant', desc: 'AI research terminal' },
  { app: 'cases', glyph: 'cases', label: 'Case Files', desc: 'Personal investigations' },
];

export function LauncherMenu({ onOpen, onClose }: LauncherMenuProps) {
  return (
    <>
      <div className="fixed inset-0 z-[600]" onPointerDown={onClose} />
      <div
        className="menu-dropdown absolute z-[601] scale-in py-1"
        style={{ left: 4, bottom: 30, minWidth: 240 }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="px-3 py-1 text-[10px] uppercase tracking-widest text-deep-green/60 border-b border-line-dark/40">
          Applications
        </div>
        {ITEMS.map((it) => (
          <div
            key={it.app}
            className="menu-dropdown-item flex items-center gap-2 py-1.5"
            onClick={() => {
              onOpen(it.app);
              onClose();
            }}
          >
            <PixIcon glyph={it.glyph} size={20} />
            <div className="flex flex-col">
              <span className="font-bold">{it.label}</span>
              <span className="text-[10px] text-deep-green/60">{it.desc}</span>
            </div>
          </div>
        ))}
        <div className="menu-dropdown-sep" />
        <div className="menu-dropdown-item flex items-center gap-2 py-1.5" onClick={onClose}>
          <PixIcon glyph="logo" size={20} />
          <span className="italic text-deep-green/70">Close Launcher</span>
        </div>
      </div>
    </>
  );
}
