import type { WindowState } from '@/os/useWindowManager';
import { PixIcon } from '@/components/PixIcon';

interface TaskbarProps {
  windows: WindowState[];
  activeId: string | null;
  onLauncher: () => void;
  onTask: (id: string) => void;
  systemStatus: string;
}

const APP_GLYPH: Record<string, string> = {
  discovery: 'discovery',
  archives: 'archives',
  lab: 'lab',
  simulation: 'simulation',
  gemma: 'gemma',
  cases: 'cases',
};

export function Taskbar({ windows, activeId, onLauncher, onTask, systemStatus }: TaskbarProps) {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="taskbar fixed bottom-0 left-0 right-0 z-[500] flex items-center gap-2 px-1 select-none" style={{ height: 28 }}>
      <button
        onClick={onLauncher}
        className="btn-raised flex items-center gap-1 px-2 py-0.5 text-[12px] font-bold"
        title="System Launcher"
        style={{ height: 22 }}
      >
        <PixIcon glyph="logo" size={13} />
        <span>Start</span>
      </button>
      <div className="w-px h-4 bg-line-dark/40" />
      <div className="flex items-center gap-1 flex-1 overflow-hidden">
        {windows.map((w) => {
          const isActive = w.id === activeId && !w.minimized;
          return (
            <button
              key={w.id}
              onClick={() => onTask(w.id)}
              className={`taskbar-btn flex items-center gap-1 ${isActive ? 'is-active' : ''}`}
              title={w.title}
            >
              <PixIcon glyph={APP_GLYPH[w.app] ?? 'logo'} size={12} />
              <span className="truncate">{w.title}</span>
              {w.minimized && <span className="opacity-60">▾</span>}
            </button>
          );
        })}
      </div>
      <div className="panel-inset flex items-center gap-2 px-2 h-[22px] text-[12px]">
        <span className="flex items-center gap-1">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: 'var(--accent-phosphor)' }}
          />
          {systemStatus}
        </span>
        <span className="opacity-60">|</span>
        <span className="tabular-nums">{time}</span>
      </div>
    </div>
  );
}
