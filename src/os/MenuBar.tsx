import { useEffect, useRef, useState } from 'react';
import type { AppId } from '@/os/useWindowManager';
import { PixIcon } from '@/components/PixIcon';

interface MenuBarProps {
  onOpen: (app: AppId) => void;
  systemStatus: string;
}

interface MenuItem {
  label: string;
  shortcut?: string;
  action?: () => void;
  sep?: boolean;
  disabled?: boolean;
}

export function MenuBar({ onOpen, systemStatus }: MenuBarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    window.addEventListener('mousedown', onDown);
    return () => window.removeEventListener('mousedown', onDown);
  }, []);

  const menus: Record<string, MenuItem[]> = {
    System: [
      { label: 'About Archaeologist OS', action: () => alert('ARCHAEOLOGIST OS v1.95\n(c) 1995 Helios Historical Research Labs\n\nA dedicated system for recovering humanity\u2019s forgotten technologies.') },
      { label: '', sep: true },
      { label: 'Reboot System', action: () => window.location.reload() },
      { label: 'Shut Down', action: () => alert('Shut down is not available in web mode.') },
    ],
    File: [
      { label: 'New Case File', shortcut: '⌘N', action: () => onOpen('cases') },
      { label: 'Open Discovery', shortcut: '⌘D', action: () => onOpen('discovery') },
      { label: 'Open Archive', action: () => onOpen('archives') },
      { label: '', sep: true },
      { label: 'Close Window', action: () => alert('Use the window close button.') },
    ],
    Edit: [
      { label: 'Cut', shortcut: '⌘X', disabled: true },
      { label: 'Copy', shortcut: '⌘C', disabled: true },
      { label: 'Paste', shortcut: '⌘V', disabled: true },
    ],
    Research: [
      { label: 'Discovery Index', action: () => onOpen('discovery') },
      { label: 'Historical Archives', action: () => onOpen('archives') },
      { label: 'Gemma Assistant', action: () => onOpen('gemma') },
    ],
    Discoveries: [
      { label: 'Browse All Discoveries', action: () => onOpen('discovery') },
      { label: 'Reconstruction Lab', action: () => onOpen('lab') },
      { label: 'Simulation Chamber', action: () => onOpen('simulation') },
    ],
    Tools: [
      { label: 'Case Files', action: () => onOpen('cases') },
      { label: 'Reconstruction Lab', action: () => onOpen('lab') },
      { label: 'Simulation Chamber', action: () => onOpen('simulation') },
    ],
    Help: [
      { label: 'Archaeologist OS Handbook', action: () => alert('Manual: open Discovery Index to browse technologies. Double-click desktop icons to launch applications.') },
      { label: 'About Gemma Assistant', action: () => alert('Gemma Assistant is in frontend mock mode. Connect a FastAPI backend to enable live model inference.') },
    ],
  };

  const toggle = (name: string) => {
    setOpenMenu((m) => (m === name ? null : name));
  };

  const run = (item: MenuItem) => {
    setOpenMenu(null);
    if (!item.disabled && item.action) item.action();
  };

  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      ref={barRef}
      className="menubar fixed top-0 left-0 right-0 z-[500] flex items-center select-none"
      style={{ height: 22 }}
    >
      <div className="flex items-center gap-0 h-full pl-1">
        <button
          onClick={() => toggle('System')}
          className={`menubar-item font-bold flex items-center gap-1 ${openMenu === 'System' ? 'is-open' : ''}`}
        >
          <PixIcon glyph="logo" size={13} />
          <span>Archaeologist</span>
        </button>
        {Object.keys(menus).map((name) => (
          <button
            key={name}
            onClick={() => toggle(name)}
            className={`menubar-item ${openMenu === name ? 'is-open' : ''}`}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-3 pr-2 h-full text-[12px]">
        <span className="flex items-center gap-1">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: 'var(--accent-phosphor)', boxShadow: '0 0 4px var(--accent-phosphor)' }}
          />
          {systemStatus}
        </span>
        <span className="opacity-80">|</span>
        <span className="tabular-nums">{time}</span>
      </div>

      {openMenu && (
        <div
          className="menu-dropdown absolute scale-in py-1"
          style={{ top: 22, left: getMenuLeft(openMenu) }}
        >
          {menus[openMenu].map((item, i) =>
            item.sep ? (
              <div key={i} className="menu-dropdown-sep" />
            ) : (
              <div
                key={i}
                className={`menu-dropdown-item flex items-center justify-between gap-6 ${item.disabled ? 'opacity-40' : ''}`}
                onClick={() => run(item)}
              >
                <span>{item.label}</span>
                {item.shortcut && <span className="opacity-50 text-[10px]">{item.shortcut}</span>}
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}

function getMenuLeft(name: string): number {
  // Logo item ~ 110px, then each menu ~ 44px
  const order = ['System', 'File', 'Edit', 'Research', 'Discoveries', 'Tools', 'Help'];
  const idx = order.indexOf(name);
  const base = name === 'System' ? 4 : 112;
  if (name === 'System') return base;
  let left = 112;
  for (let i = 1; i < idx; i += 1) left += order[i].length * 7 + 16;
  return left + 8;
}
