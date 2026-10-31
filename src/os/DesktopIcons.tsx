import { useState } from 'react';
import type { AppId } from '@/os/useWindowManager';
import { PixIcon } from '@/components/PixIcon';

interface DesktopIconDef {
  app: AppId;
  glyph: string;
  label: string;
}

const ICONS: DesktopIconDef[] = [
  { app: 'discovery', glyph: 'discovery', label: 'Discovery Index' },
  { app: 'archives', glyph: 'archives', label: 'Historical Archives' },
  { app: 'lab', glyph: 'lab', label: 'Reconstruction Lab' },
  { app: 'simulation', glyph: 'simulation', label: 'Simulation Chamber' },
  { app: 'gemma', glyph: 'gemma', label: 'Gemma Assistant' },
  { app: 'cases', glyph: 'cases', label: 'Case Files' },
];

export function DesktopIcons({ onOpen }: { onOpen: (app: AppId) => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div
      className="absolute left-1 top-6 flex flex-col gap-1 flex-wrap content-start"
      style={{ height: 'calc(100% - 70px)', maxWidth: 320 }}
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) setSelected(null);
      }}
    >
      {ICONS.map((icon) => {
        const isSel = selected === icon.app;
        return (
          <div
            key={icon.app}
            className={`desktop-icon ${isSel ? 'selected' : ''}`}
            onPointerDown={(e) => {
              e.stopPropagation();
              setSelected(icon.app);
            }}
            onDoubleClick={() => {
              onOpen(icon.app);
              setSelected(null);
            }}
          >
            <div className="icon-glyph">
              <PixIcon glyph={icon.glyph} size={40} />
            </div>
            <span className="icon-label">{icon.label}</span>
          </div>
        );
      })}
    </div>
  );
}
