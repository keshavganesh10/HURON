import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import * as THREE from "three";
import { Layers, Sun, Building2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHuronAudio } from "@/components/huron/audio";

/**
 * A stylised, procedural WebGL "digital twin" of a Huron pavilion.
 * - Architectural view: bronze frame, glazing, oak floor, warm interior glow.
 * - Engineering view: walls fade out, revealing thermal insulation core,
 *   structural columns and geothermal loop.
 * - Time-of-day slider drives sun angle + colour + interior lighting.
 */

type Mode = "architecture" | "engineering";

const BRONZE = "#c9a35a";
const OAK = "#7a5a3a";
const CONCRETE = "#3a3d42";
const INSULATION = "#e8b45a";

function Pavilion({ mode, tod }: { mode: Mode; tod: number }) {
  // tod 0..1 → early morning to dusk
  const wallOpacity = mode === "architecture" ? 0.88 : 0.06;
  const glazingOpacity = mode === "architecture" ? 0.35 : 0.08;
  const insulationOpacity = mode === "engineering" ? 0.85 : 0;
  const structureOpacity = mode === "engineering" ? 1 : 0.02;

  const interior = new THREE.Color().setHSL(0.09, 0.5, 0.35 + Math.abs(0.5 - tod) * 0.25);

  return (
    <group>
      {/* Ground plinth */}
      <mesh receiveShadow position={[0, -0.05, 0]}>
        <boxGeometry args={[9, 0.1, 6]} />
        <meshStandardMaterial color="#1a1c1f" roughness={0.9} />
      </mesh>

      {/* Oak floor */}
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[7.5, 0.02, 4.8]} />
        <meshStandardMaterial color={OAK} roughness={0.7} metalness={0.05} />
      </mesh>

      {/* Interior glow (represents warm lighting) */}
      <pointLight position={[0, 1.2, 0]} intensity={mode === "architecture" ? 2.2 : 0.8} color={interior} distance={9} decay={2} />
      <pointLight position={[-2, 1.4, 1.5]} intensity={1.1} color="#f0c98a" distance={5} decay={2} />

      {/* Bronze frame — four corner columns */}
      {[
        [-3.65, 1.35, -2.3],
        [3.65, 1.35, -2.3],
        [-3.65, 1.35, 2.3],
        [3.65, 1.35, 2.3],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[0.14, 2.7, 0.14]} />
          <meshStandardMaterial color={BRONZE} metalness={0.9} roughness={0.28} />
        </mesh>
      ))}

      {/* Roof plane */}
      <mesh position={[0, 2.72, 0]} castShadow>
        <boxGeometry args={[7.6, 0.08, 4.9]} />
        <meshStandardMaterial color="#2a2c30" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 2.78, 0]}>
        <boxGeometry args={[7.9, 0.02, 5.2]} />
        <meshStandardMaterial color={BRONZE} metalness={0.85} roughness={0.3} />
      </mesh>

      {/* Solid opaque walls (architectural) */}
      <Wall position={[0, 1.35, -2.3]} args={[7.4, 2.62, 0.06]} opacity={wallOpacity} />
      <Wall position={[-3.65, 1.35, 0]} args={[0.06, 2.62, 4.6]} opacity={wallOpacity} />
      <Wall position={[3.65, 1.35, 0]} args={[0.06, 2.62, 4.6]} opacity={wallOpacity} />

      {/* Glazing (front) — always somewhat transparent */}
      <mesh position={[0, 1.35, 2.3]}>
        <boxGeometry args={[7.4, 2.62, 0.04]} />
        <meshPhysicalMaterial
          color="#a9c4d4"
          transparent
          opacity={glazingOpacity}
          transmission={0.9}
          thickness={0.5}
          roughness={0.05}
          metalness={0}
          ior={1.45}
        />
      </mesh>

      {/* Insulation core — visible in engineering view */}
      <Insulation position={[0, 1.35, -2.24]} args={[7.2, 2.4, 0.05]} opacity={insulationOpacity} />
      <Insulation position={[-3.59, 1.35, 0]} args={[0.05, 2.4, 4.4]} opacity={insulationOpacity} />
      <Insulation position={[3.59, 1.35, 0]} args={[0.05, 2.4, 4.4]} opacity={insulationOpacity} />

      {/* Structural columns — steel spine, visible in engineering view */}
      {[-2.5, 0, 2.5].map((x) => (
        <mesh key={x} position={[x, 1.35, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 2.55, 12]} />
          <meshStandardMaterial color="#8892a0" metalness={0.85} roughness={0.35} transparent opacity={structureOpacity} />
        </mesh>
      ))}

      {/* Geothermal loop under floor — engineering only */}
      {mode === "engineering" && <GeothermalLoop />}

      {/* Interior furniture (only in architecture) */}
      {mode === "architecture" && <InteriorFurniture />}

      {/* Callouts */}
      {mode === "engineering" && (
        <>
          <Callout position={[0, 2.9, 0]} label="Bronze cap · thermally broken" tone="bronze" />
          <Callout position={[3.9, 1.5, -1.8]} label="R-9.2 insulation core" tone="bronze" />
          <Callout position={[-2.6, 0.2, 0]} label="Geothermal loop · 6 borehole array" tone="glow" />
          <Callout position={[2.5, 1.6, 1.4]} label="Steel spine · post-tensioned" tone="glow" />
        </>
      )}
    </group>
  );
}

function Wall({ position, args, opacity }: { position: [number, number, number]; args: [number, number, number]; opacity: number }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={CONCRETE} roughness={0.85} metalness={0.05} transparent opacity={opacity} depthWrite={opacity > 0.5} />
    </mesh>
  );
}

function Insulation({ position, args, opacity }: { position: [number, number, number]; args: [number, number, number]; opacity: number }) {
  return (
    <mesh position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial
        color={INSULATION}
        emissive={INSULATION}
        emissiveIntensity={0.35}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  );
}

function GeothermalLoop() {
  const g = useRef<THREE.Group>(null);
  useFrame((_s, dt) => {
    if (g.current) g.current.rotation.y += dt * 0.15;
  });
  return (
    <group position={[0, -0.4, 0]} ref={g}>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 2.4, -0.6 - i * 0.02, Math.sin(a) * 1.4]}>
            <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
            <meshStandardMaterial color="#6ecfd8" emissive="#3aa9b8" emissiveIntensity={0.9} />
          </mesh>
        );
      })}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.4, 0.03, 8, 48]} />
        <meshStandardMaterial color="#6ecfd8" emissive="#3aa9b8" emissiveIntensity={0.9} />
      </mesh>
    </group>
  );
}

function InteriorFurniture() {
  return (
    <group>
      {/* Long low sofa */}
      <mesh position={[-1.6, 0.28, 0.6]}>
        <boxGeometry args={[2.4, 0.5, 0.9]} />
        <meshStandardMaterial color="#3a3229" roughness={0.9} />
      </mesh>
      {/* Bronze coffee table */}
      <mesh position={[-1.6, 0.18, 1.7]}>
        <boxGeometry args={[1.4, 0.06, 0.7]} />
        <meshStandardMaterial color={BRONZE} metalness={0.85} roughness={0.35} />
      </mesh>
      {/* Kitchen island */}
      <mesh position={[2, 0.45, -0.6]}>
        <boxGeometry args={[1.8, 0.88, 1.1]} />
        <meshStandardMaterial color="#e9e5df" roughness={0.35} metalness={0.15} />
      </mesh>
      {/* Fireplace */}
      <mesh position={[0, 0.7, -2.1]}>
        <boxGeometry args={[1.2, 1.2, 0.15]} />
        <meshStandardMaterial color="#1a1a1c" roughness={0.5} />
      </mesh>
      <pointLight position={[0, 0.8, -2]} intensity={0.9} color="#f2854a" distance={2.5} decay={2} />
    </group>
  );
}

function Callout({ position, label, tone }: { position: [number, number, number]; label: string; tone: "bronze" | "glow" }) {
  return (
    <Html position={position} center distanceFactor={7} occlude={false}>
      <div
        className={cn(
          "pointer-events-none whitespace-nowrap border px-3 py-1 font-mono text-[0.55rem] uppercase tracking-[0.22em] backdrop-blur-sm",
          tone === "bronze" ? "border-bronze/60 bg-black/60 text-bronze-glow" : "border-cyan-300/40 bg-black/60 text-cyan-200",
        )}
      >
        {label}
      </div>
    </Html>
  );
}

function SunLight({ tod }: { tod: number }) {
  const a = tod * Math.PI; // 0..π
  const x = Math.cos(a) * 10;
  const y = Math.sin(a) * 8 + 1;
  const z = 3;
  const warmth = new THREE.Color().lerpColors(new THREE.Color("#ff9c5a"), new THREE.Color("#f5efe0"), Math.sin(a));
  return (
    <>
      <directionalLight position={[x, y, z]} intensity={1.4} color={warmth} castShadow />
      <hemisphereLight args={["#dfe8f0", "#1a1c1f", 0.35]} />
    </>
  );
}

export function DigitalTwin3D() {
  const [mode, setMode] = useState<Mode>("architecture");
  const [tod, setTod] = useState(0.55);
  const audio = useHuronAudio();

  return (
    <div className="relative border border-hairline bg-card">
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_20%,_color-mix(in_oklab,var(--color-bronze)_18%,transparent),transparent_70%)]" />

      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-bronze status-dot" />
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-bronze">Live Digital Twin</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              audio?.click("soft");
              setMode("architecture");
            }}
            className={cn(
              "inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] transition-all",
              mode === "architecture"
                ? "border-bronze/60 bg-bronze/15 text-bronze-glow"
                : "border-hairline text-foreground/60 hover:text-foreground",
            )}
          >
            <Building2 className="h-3 w-3" /> Architectural
          </button>
          <button
            onClick={() => {
              audio?.click("tick");
              setMode("engineering");
            }}
            className={cn(
              "inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] transition-all",
              mode === "engineering"
                ? "border-bronze/60 bg-bronze/15 text-bronze-glow"
                : "border-hairline text-foreground/60 hover:text-foreground",
            )}
          >
            <Layers className="h-3 w-3" /> Engineering X-Ray
          </button>
        </div>
      </div>

      <div className="relative aspect-[16/10] w-full">
        <Suspense
          fallback={
            <div className="grid h-full w-full place-items-center text-bronze-glow">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          }
        >
          <Canvas shadows camera={{ position: [7, 4.5, 8], fov: 40 }} dpr={[1, 2]} gl={{ antialias: true }}>
            <color attach="background" args={["#0d0e11"]} />
            <fog attach="fog" args={["#0d0e11", 12, 26]} />
            <SunLight tod={tod} />
            <Pavilion mode={mode} tod={tod} />
            <Environment preset="sunset" />
            <OrbitControls
              enablePan={false}
              minDistance={7}
              maxDistance={16}
              minPolarAngle={Math.PI * 0.15}
              maxPolarAngle={Math.PI * 0.48}
              autoRotate
              autoRotateSpeed={0.35}
            />
          </Canvas>
        </Suspense>
      </div>

      <div className="relative z-20 grid gap-3 border-t border-hairline px-5 py-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
        <div className="flex items-center gap-2 text-foreground/70">
          <Sun className="h-3.5 w-3.5 text-bronze" />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em]">Time of Day</span>
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={tod}
          onChange={(e) => setTod(parseFloat(e.target.value))}
          className="twin-range w-full"
        />
        <div className="text-right font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bronze-glow">
          {formatTod(tod)}
        </div>
      </div>

      <style>{`
        .twin-range { -webkit-appearance:none; height:2px;
          background: linear-gradient(to right, var(--color-bronze), var(--color-bronze-glow)); outline:none; }
        .twin-range::-webkit-slider-thumb { -webkit-appearance:none; width:18px; height:18px; border-radius:999px;
          background: var(--color-bronze-glow); border:3px solid var(--color-ink);
          box-shadow: 0 0 0 1px var(--color-bronze); cursor:grab; }
      `}</style>
    </div>
  );
}

function formatTod(t: number) {
  const total = 6 + t * 12; // 06:00 → 18:00
  const h = Math.floor(total);
  const m = Math.floor((total - h) * 60);
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}
