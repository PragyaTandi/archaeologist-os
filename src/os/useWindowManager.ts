import { useCallback, useRef, useState } from 'react';

export interface WindowState {
  id: string;
  app: AppId;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minimized: boolean;
  maximized: boolean;
  z: number;
  /** restore rectangle when un-maximising */
  prevRect?: { x: number; y: number; w: number; h: number };
  /** optional payload, e.g. a discovery id for a detail window */
  payload?: string;
}

export type AppId =
  | 'discovery'
  | 'archives'
  | 'lab'
  | 'simulation'
  | 'gemma'
  | 'cases';

export const APP_META: Record<AppId, { title: string; w: number; h: number }> = {
  discovery: { title: 'Discovery Index', w: 820, h: 560 },
  archives: { title: 'Historical Archives', w: 780, h: 560 },
  lab: { title: 'Reconstruction Lab', w: 880, h: 600 },
  simulation: { title: 'Simulation Chamber', w: 760, h: 620 },
  gemma: { title: 'Gemma Assistant', w: 680, h: 560 },
  cases: { title: 'Case Files', w: 720, h: 540 },
};

let zCounter = 10;

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const idRef = useRef(0);

  const focus = useCallback((id: string) => {
    zCounter += 1;
    setActiveId(id);
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, z: zCounter, minimized: false } : w)),
    );
  }, []);

  const open = useCallback(
    (app: AppId, payload?: string, titleOverride?: string) => {
      // If an instance with the same app+payload exists, focus it instead.
      setWindows((ws) => {
        const existing = ws.find(
          (w) => w.app === app && (payload === undefined || w.payload === payload),
        );
        if (existing) {
          zCounter += 1;
          setActiveId(existing.id);
          return ws.map((w) =>
            w.id === existing.id
              ? { ...w, z: zCounter, minimized: false }
              : w,
          );
        }
        const meta = APP_META[app];
        idRef.current += 1;
        const id = `${app}-${idRef.current}`;
        zCounter += 1;
        const offset = (idRef.current % 5) * 26;
        const newWin: WindowState = {
          id,
          app,
          title: titleOverride ?? meta.title,
          x: 90 + offset,
          y: 48 + offset,
          w: meta.w,
          h: meta.h,
          minimized: false,
          maximized: false,
          z: zCounter,
          payload,
        };
        setActiveId(id);
        return [...ws, newWin];
      });
    },
    [],
  );

  const close = useCallback((id: string) => {
    setWindows((ws) => ws.filter((w) => w.id !== id));
    setActiveId((a) => (a === id ? null : a));
  }, []);

  const minimise = useCallback((id: string) => {
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
    );
    setActiveId((a) => (a === id ? null : a));
  }, []);

  const toggleMax = useCallback(
    (id: string) => {
      setWindows((ws) =>
        ws.map((w) => {
          if (w.id !== id) return w;
          if (w.maximized && w.prevRect) {
            return {
              ...w,
              maximized: false,
              x: w.prevRect.x,
              y: w.prevRect.y,
              w: w.prevRect.w,
              h: w.prevRect.h,
              prevRect: undefined,
            };
          }
          return {
            ...w,
            maximized: true,
            prevRect: { x: w.x, y: w.y, w: w.w, h: w.h },
          };
        }),
      );
      focus(id);
    },
    [focus],
  );

  const setRect = useCallback((id: string, rect: Partial<Pick<WindowState, 'x' | 'y' | 'w' | 'h'>>) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, ...rect } : w)));
  }, []);

  return { windows, activeId, open, close, minimise, toggleMax, setRect, focus };
}
