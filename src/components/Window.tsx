import { useEffect, useRef, type PointerEvent, type ReactNode } from 'react';
import type { WindowState } from '@/os/useWindowManager';
import { PixIcon } from '@/components/PixIcon';

interface WindowProps {
  win: WindowState;
  active: boolean;
  iconGlyph: string;
  onFocus: () => void;
  onClose: () => void;
  onMinimise: () => void;
  onToggleMax: () => void;
  onDrag: (x: number, y: number) => void;
  onResize: (w: number, h: number) => void;
  children: ReactNode;
  /** status text shown in the bottom status bar */
  status?: string;
  /** optional toolbar node rendered below the title bar */
  toolbar?: ReactNode;
}

const MIN_W = 320;
const MIN_H = 220;
const TASKBAR_H = 28;
const MENUBAR_H = 22;

export function Window({
  win,
  active,
  iconGlyph,
  onFocus,
  onClose,
  onMinimise,
  onToggleMax,
  onDrag,
  onResize,
  children,
  status,
  toolbar,
}: WindowProps) {
  const dragRef = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);
  const resizeRef = useRef<{ sx: number; sy: number; ow: number; oh: number } | null>(null);

  // Pointer move handlers attached to window for smooth dragging
  useEffect(() => {
    function move(e: PointerEvent) {
      if (dragRef.current) {
        const dx = e.clientX - dragRef.current.sx;
        const dy = e.clientY - dragRef.current.sy;
        const nx = Math.max(0, Math.min(window.innerWidth - 80, dragRef.current.ox + dx));
        const ny = Math.max(
          MENUBAR_H,
          Math.min(window.innerHeight - TASKBAR_H - 24, dragRef.current.oy + dy),
        );
        onDrag(nx, ny);
      } else if (resizeRef.current) {
        const dw = e.clientX - resizeRef.current.sx;
        const dh = e.clientY - resizeRef.current.sy;
        onResize(
          Math.max(MIN_W, Math.min(window.innerWidth - win.x - 4, resizeRef.current.ow + dw)),
          Math.max(MIN_H, Math.min(window.innerHeight - win.y - TASKBAR_H - 4, resizeRef.current.oh + dh)),
        );
      }
    }
    function up() {
      dragRef.current = null;
      resizeRef.current = null;
      document.body.style.cursor = '';
    }
    if (dragRef.current || resizeRef.current) {
      window.addEventListener('pointermove', move as unknown as EventListener);
      window.addEventListener('pointerup', up);
      return () => {
        window.removeEventListener('pointermove', move as unknown as EventListener);
        window.removeEventListener('pointerup', up);
      };
    }
  });

  const startDrag = (e: PointerEvent) => {
    if (win.maximized) return;
    onFocus();
    dragRef.current = { sx: e.clientX, sy: e.clientY, ox: win.x, oy: win.y };
  };
  const startResize = (e: PointerEvent) => {
    e.stopPropagation();
    onFocus();
    resizeRef.current = { sx: e.clientX, sy: e.clientY, ow: win.w, oh: win.h };
  };

  if (win.minimized) return null;

  const style: React.CSSProperties = {
    left: win.x,
    top: win.y,
    width: win.w,
    height: win.h,
    zIndex: win.z,
  };
  if (win.maximized) {
    style.left = 0;
    style.top = MENUBAR_H;
    style.width = '100vw';
    style.height = `calc(100vh - ${MENUBAR_H + TASKBAR_H}px)`;
  }

  return (
    <div
      className="window-frame absolute flex flex-col fade-in"
      style={style}
      onPointerDown={onFocus}
    >
      {/* Title bar */}
      <div
        className={`title-bar flex items-center gap-1 px-1 select-none ${
          active ? '' : 'inactive'
        }`}
        style={{ height: 20, cursor: win.maximized ? 'default' : 'move' }}
        onPointerDown={startDrag}
        onDoubleClick={onToggleMax}
      >
        <PixIcon glyph={iconGlyph} size={14} style={{ flexShrink: 0 }} />
        <span className="text-[12px] truncate flex-1 ml-1">{win.title}</span>
        <button
          className="title-btn"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={onMinimise}
          title="Minimise"
          aria-label="Minimise"
        >
          _
        </button>
        <button
          className="title-btn"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={onToggleMax}
          title="Maximise"
          aria-label="Maximise"
        >
          {win.maximized ? '▢' : '□'}
        </button>
        <button
          className="title-btn"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={onClose}
          title="Close"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* Toolbar */}
      {toolbar && <div className="border-b border-green-black bg-paper-dark/60">{toolbar}</div>}

      {/* Content */}
      <div className="flex-1 overflow-auto relative" style={{ background: 'var(--win-bg)' }}>
        {children}
      </div>

      {/* Status bar */}
      <div
        className="flex items-center gap-2 px-2 text-[10px] text-deep-green"
        style={{
          height: 16,
          background: 'var(--paper-dark)',
          borderTop: '1px solid var(--line-dark)',
        }}
      >
        <span className="panel-inset px-1 flex-1 truncate">{status ?? 'Ready'}</span>
      </div>

      {/* Resize handle */}
      {!win.maximized && (
        <div
          onPointerDown={startResize}
          style={{
            position: 'absolute',
            right: 0,
            bottom: 16,
            width: 14,
            height: 14,
            cursor: 'nwse-resize',
            background:
              'linear-gradient(135deg, transparent 0 40%, var(--line-dark) 40% 50%, transparent 50% 60%, var(--line-dark) 60% 70%, transparent 70% 80%, var(--line-dark) 80% 90%, transparent 90%)',
          }}
        />
      )}
    </div>
  );
}
