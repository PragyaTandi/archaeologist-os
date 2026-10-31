import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, Gauge } from 'lucide-react';

interface GearConfig {
  teeth: number;
  radius: number;
  thickness: number;
  color: number;
  x: number;
  y: number;
  speed: number;
}

function makeGear(config: GearConfig): THREE.Group {
  const group = new THREE.Group();
  const { teeth, radius, color, x, y, speed } = config;
  const thickness = 0.5;

  // Gear body — approximated with a cylinder + tooth boxes
  const bodyGeom = new THREE.CylinderGeometry(radius * 0.88, radius * 0.88, thickness, 64);
  const bodyMat = new THREE.MeshStandardMaterial({
    color,
    metalness: 0.85,
    roughness: 0.35,
  });
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.rotation.x = Math.PI / 2;
  group.add(body);

  // Teeth
  const toothGeom = new THREE.BoxGeometry(radius * 0.18, thickness + 0.06, radius * 0.28);
  for (let i = 0; i < teeth; i += 1) {
    const angle = (i / teeth) * Math.PI * 2;
    const tooth = new THREE.Mesh(toothGeom, bodyMat);
    tooth.position.set(Math.cos(angle) * radius * 0.95, 0, Math.sin(angle) * radius * 0.95);
    tooth.rotation.y = -angle;
    group.add(tooth);
  }

  // Spokes
  const spokeGeom = new THREE.BoxGeometry(radius * 0.6, thickness + 0.04, radius * 0.08);
  for (let i = 0; i < 4; i += 1) {
    const spoke = new THREE.Mesh(spokeGeom, bodyMat);
    spoke.rotation.y = (i / 4) * Math.PI * 2;
    group.add(spoke);
  }

  // Hub
  const hubGeom = new THREE.CylinderGeometry(radius * 0.16, radius * 0.16, thickness + 0.1, 24);
  const hub = new THREE.Mesh(hubGeom, new THREE.MeshStandardMaterial({ color: 0x5a3e20, metalness: 0.6, roughness: 0.4 }));
  hub.rotation.x = Math.PI / 2;
  group.add(hub);

  // Pin marker (for visual rotation reference)
  const pinGeom = new THREE.SphereGeometry(radius * 0.05, 12, 12);
  const pin = new THREE.Mesh(pinGeom, new THREE.MeshStandardMaterial({ color: 0xe8e0c9, emissive: 0x75c66a, emissiveIntensity: 0.5 }));
  pin.position.set(radius * 0.5, thickness / 2 + 0.05, 0);
  group.add(pin);

  group.position.set(x, 0, y);
  group.userData.speed = speed;
  return group;
}

export function SimulationChamber() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{ gears: THREE.Group[]; renderer: THREE.WebGLRenderer; scene: THREE.Scene; camera: THREE.PerspectiveCamera } | null>(null);
  const animRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const playRef = useRef(playing);
  const speedRef = useRef(speed);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    playRef.current = playing;
  }, [playing]);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e2f20);

    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 8, 11);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0x557755, 0.6));
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(5, 10, 7);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x75c66a, 0.4);
    fill.position.set(-6, 4, -3);
    scene.add(fill);

    // Base plate
    const baseGeom = new THREE.CircleGeometry(6, 48);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x10251a, metalness: 0.2, roughness: 0.8 });
    const base = new THREE.Mesh(baseGeom, baseMat);
    base.rotation.x = -Math.PI / 2;
    base.position.y = -0.4;
    scene.add(base);

    // Grid helper
    const grid = new THREE.GridHelper(12, 24, 0x4f8a47, 0x2a4a36);
    (grid.material as THREE.Material).opacity = 0.25;
    (grid.material as THREE.Material).transparent = true;
    grid.position.y = -0.39;
    scene.add(grid);

    // Gears — a small Antikythera-like train
    const gears: THREE.Group[] = [];
    const g1 = makeGear({ teeth: 40, radius: 2.2, thickness: 0.5, color: 0x8a9a7a, x: 0, y: 0, speed: 0.5 });
    const g2 = makeGear({ teeth: 20, radius: 1.1, thickness: 0.5, color: 0xb08a5a, x: 3.1, y: 0, speed: -1.0 });
    const g3 = makeGear({ teeth: 12, radius: 0.7, thickness: 0.5, color: 0x6f8a62, x: -2.7, y: 0.5, speed: 1.67 });
    gears.push(g1, g2, g3);
    gears.forEach((g) => scene.add(g));

    sceneRef.current = { gears, renderer, scene, camera };

    let localRotation = 0;
    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      if (playRef.current) {
        const dt = 0.016 * speedRef.current;
        localRotation += dt;
        gears.forEach((g) => {
          g.rotation.z = localRotation * (g.userData.speed as number);
        });
        setRotation((localRotation * 180) % 360);
      }
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      ro.disconnect();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  const reset = () => {
    setPlaying(false);
    setSpeed(1);
    setRotation(0);
    if (sceneRef.current) {
      sceneRef.current.gears.forEach((g) => (g.rotation.z = 0));
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-2 py-1 border-b border-green-black" style={{ background: 'var(--win-title)' }}>
        <span className="font-bold text-[12px] text-green-black flex items-center gap-1">
          <Gauge size={14} /> ANTIKYTHERA MECHANISM — SIMULATION
        </span>
        <div className="flex-1" />
        <button
          onClick={() => setPlaying((p) => !p)}
          className="btn-raised flex items-center gap-1 px-2 py-0.5 text-[11px]"
        >
          {playing ? <Pause size={12} /> : <Play size={12} />}
          {playing ? 'Pause' : 'Play'}
        </button>
        <button onClick={reset} className="btn-raised flex items-center gap-1 px-2 py-0.5 text-[11px]">
          <RotateCcw size={12} /> Reset
        </button>
        <div className="flex items-center gap-1 text-[10px] font-mono text-deep-green">
          <span>SPEED</span>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-24"
          />
          <span className="tabular-nums w-10">{speed.toFixed(1)}×</span>
        </div>
      </div>

      {/* Viewport */}
      <div className="flex-1 relative overflow-hidden">
        <div ref={mountRef} className="absolute inset-0" />
        {/* HUD overlay */}
        <div className="absolute top-2 left-2 panel-inset px-2 py-1 font-mono text-[10px] text-deep-green" style={{ background: 'var(--paper)' }}>
          <div>STATUS: {playing ? 'RUNNING' : 'PAUSED'}</div>
          <div>ROTATION: {rotation.toFixed(1)}°</div>
          <div>SPEED: {speed.toFixed(2)}×</div>
        </div>
        <div className="absolute bottom-2 right-2 panel-inset px-2 py-1 font-mono text-[9px] text-deep-green/70 max-w-[260px]" style={{ background: 'var(--paper)' }}>
          3 gears model the drive train: a 40-tooth main drive (b1), a 20-tooth mean-sun transfer, and a 12-tooth output.
          Press Play to rotate; drag the speed slider to vary the rate.
        </div>
      </div>

      {/* Explanation */}
      <div className="border-t border-green-black p-2 max-h-28 overflow-auto" style={{ background: 'var(--paper-dark)' }}>
        <h3 className="font-serif-hist text-[14px] text-deep-green mb-1">Astronomical Purpose</h3>
        <p className="text-[11px] text-deep-green leading-relaxed selectable">
          The Antikythera Mechanism predicted solar eclipses and tracked lunar phases using a differential gear train.
          The main drive gear (b1, 223 teeth in the original) indexes the 365-day year; meshing gears sum and subtract
          cycles to compute the Metonic (235 lunations = 19 years) and Saros (223 lunations, eclipse cycle) periods.
          The pin-and-slot mechanism on the lunar gear corrects for the elliptical anomaly of the Moon orbit.
        </p>
      </div>
    </div>
  );
}
