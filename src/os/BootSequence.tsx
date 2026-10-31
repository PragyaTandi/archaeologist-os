import { useEffect, useState } from 'react';

const BOOT_LINES = [
  { t: 220, text: 'ARCHAEOLOGIST OS  v1.95  (c) HELIOS HISTORICAL RESEARCH LABS' },
  { t: 300, text: '> Initialising research kernel....................[ OK ]' },
  { t: 300, text: '> Mounting archive volume /dev/archive0...........[ OK ]' },
  { t: 280, text: '> Loading historical archive database.............[ OK ]' },
  { t: 260, text: '> Indexing 8 discovery records....................[ OK ]' },
  { t: 260, text: '> Indexing 10 archival documents..................[ OK ]' },
  { t: 320, text: '> Preparing reconstruction environment.............[ OK ]' },
  { t: 280, text: '> Compiling component manifests...................[ OK ]' },
  { t: 300, text: '> Initialising simulation modules................[ OK ]' },
  { t: 280, text: '> Calibrating Antikythera gear model..............[ OK ]' },
  { t: 320, text: '> Checking Gemma research engine..................[ STANDBY ]' },
  { t: 240, text: '> Gemma offline — frontend mock mode active' },
  { t: 260, text: '> Loading case file store from local archive......[ OK ]' },
  { t: 260, text: '> Starting window manager........................[ OK ]' },
  { t: 400, text: '' },
  { t: 100, text: '  >> SYSTEM READY <<' },
];

export function BootSequence({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState<string[]>([]);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    let i = 0;
    let timer: number | undefined;
    let total = 0;
    const timers: number[] = [];
    const run = () => {
      if (i >= BOOT_LINES.length) {
        timer = window.setTimeout(onDone, 700);
        return;
      }
      const line = BOOT_LINES[i];
      total += line.t;
      const idx = i;
      timers.push(
        window.setTimeout(() => {
          setVisible((v) => [...v, line.text]);
          if (idx === BOOT_LINES.length - 1) {
            window.setTimeout(onDone, 900);
          }
        }, total),
      );
      i += 1;
      timer = window.setTimeout(run, 0);
    };
    run();
    return () => {
      if (timer) clearTimeout(timer);
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSkip = () => {
    if (skip) return;
    setSkip(true);
    onDone();
  };

  return (
    <div
      className="terminal-bg terminal-text crt-scanlines fixed inset-0 z-[1000] flex flex-col p-6 select-none"
      style={{ fontSize: 18 }}
    >
      <pre className="text-phosphor mb-2 leading-tight" style={{ fontSize: 14 }}>
{String.raw`  ╔══════════════════════════════════════════════════════════════╗
  ║   ___   ____ _   _ ____   ___   ____ ____ _____ __  __ ____  ║
  ║  / _ \ / ___| | | / ___| / _ \ / ___/ ___|_   _|  \/  / ___| ║
  ║ / /_)/ | |   | |_| \___ \/ /_)/| |  |  _|  | | | |\/| \___ \ ║
  ║/ ___/| | |___|  _  |___) / ___/| |__| |_|  | | | |  | |___) |║
  ║\/     \____|_| |_|____/_/    \____\____| |_| |_|  |_|____/ ║
  ║                                                              ║
  ║          THE ARCHAEOLOGIST  —  FORGOTTEN TECH RESEARCH        ║
  ╚══════════════════════════════════════════════════════════════╝`}
      </pre>
      <div className="flex-1 overflow-hidden">
        {visible.map((l, i) => (
          <div key={i} className="leading-tight">
            {l || '\u00A0'}
          </div>
        ))}
        <span className="blink">█</span>
      </div>
      <button
        onClick={handleSkip}
        className="self-end mt-2 px-3 py-1 btn-raised text-[12px] font-mono"
        style={{ fontFamily: "'Source Code Pro', monospace" }}
      >
        Skip Boot ▸
      </button>
    </div>
  );
}
