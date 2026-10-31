import { lazy, Suspense, useState } from 'react';
import { CaseFiles } from '@/apps/CaseFiles';
import { DiscoveryDetail, DiscoveryIndex } from '@/apps/DiscoveryIndex';
import { GemmaAssistant } from '@/apps/GemmaAssistant';
import { HistoricalArchives } from '@/apps/HistoricalArchives';
import { ReconstructionLab } from '@/apps/ReconstructionLab';
import { PixIcon } from '@/components/PixIcon';
import { Window } from '@/components/Window';
import { discoveries } from '@/data/discoveries';
import { BootSequence } from '@/os/BootSequence';
import { DesktopIcons } from '@/os/DesktopIcons';
import { LauncherMenu } from '@/os/LauncherMenu';
import { MenuBar } from '@/os/MenuBar';
import { Taskbar } from '@/os/Taskbar';
import { useWindowManager, type AppId, type WindowState } from '@/os/useWindowManager';

const SimulationChamber = lazy(() =>
  import('@/apps/SimulationChamber').then((module) => ({
    default: module.SimulationChamber,
  })),
);

function App() {
  const [booting, setBooting] = useState(true);
  const [launcherOpen, setLauncherOpen] = useState(false);
  const { windows, activeId, open, close, minimise, toggleMax, setRect, focus } =
    useWindowManager();

  const openDiscovery = (id: string) => {
    const discovery = discoveries.find((item) => item.id === id);
    open('discovery', id, discovery?.name ?? 'Discovery Record');
  };

  const renderWindowContent = (win: WindowState) => {
    switch (win.app) {
      case 'discovery':
        if (!win.payload) {
          return <DiscoveryIndex onOpenDiscovery={openDiscovery} />;
        }
        {
          const discovery = discoveries.find((item) => item.id === win.payload);
          return discovery ? (
            <DiscoveryDetail discovery={discovery} />
          ) : (
            <div className="p-4 text-[12px] text-deep-green" role="status">
              This discovery record could not be found.
            </div>
          );
        }
      case 'archives':
        return <HistoricalArchives />;
      case 'lab':
        return <ReconstructionLab />;
      case 'simulation':
        return (
          <Suspense
            fallback={
              <div className="p-3 text-[12px] text-deep-green" role="status">
                Loading simulation chamber…
              </div>
            }
          >
            <SimulationChamber />
          </Suspense>
        );
      case 'gemma':
        return <GemmaAssistant />;
      case 'cases':
        return <CaseFiles />;
    }
  };

  const handleOpenApp = (app: AppId) => {
    open(app);
    setLauncherOpen(false);
  };

  if (booting) {
    return <BootSequence onDone={() => setBooting(false)} />;
  }

  return (
    <main className="desktop-bg relative h-full w-full overflow-hidden" aria-label="Archaeologist OS desktop">
      <DesktopIcons onOpen={handleOpenApp} />

      {windows.map((win) => (
        <Window
          key={win.id}
          win={win}
          active={win.id === activeId}
          iconGlyph={win.app}
          onFocus={() => focus(win.id)}
          onClose={() => close(win.id)}
          onMinimise={() => minimise(win.id)}
          onToggleMax={() => toggleMax(win.id)}
          onDrag={(x, y) => setRect(win.id, { x, y })}
          onResize={(w, h) => setRect(win.id, { w, h })}
          status={win.payload ? 'Record loaded from local archive' : 'Ready'}
        >
          {renderWindowContent(win)}
        </Window>
      ))}

      <MenuBar onOpen={handleOpenApp} systemStatus="ARCHIVE READY" />
      <Taskbar
        windows={windows}
        activeId={activeId}
        onLauncher={() => setLauncherOpen((isOpen) => !isOpen)}
        onTask={focus}
        systemStatus="ONLINE"
      />
      {launcherOpen && (
        <LauncherMenu onOpen={handleOpenApp} onClose={() => setLauncherOpen(false)} />
      )}

      {windows.length === 0 && (
        <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2 px-4 text-center text-paper/80">
          <PixIcon glyph="logo" size={54} />
          <p className="font-serif-hist text-lg">The Forgotten Technologies Codex</p>
          <p className="max-w-md text-[11px]">
            Open an application from the desktop or Start menu to explore the archive.
          </p>
        </div>
      )}
    </main>
  );
}

export default App;
