import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, Play, Pause, Layers, Eye, RefreshCw } from 'lucide-react';

interface ThreeTechSphereProps {
  theme: 'dark' | 'light';
  lang: 'fa' | 'en';
}

export const ThreeTechSphere: React.FC<ThreeTechSphereProps> = ({ theme, lang }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [wireframeOnly, setWireframeOnly] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [activePreset, setActivePreset] = useState<'orbit' | 'nodes' | 'pulse'>('orbit');

  // Internal animation state ref to avoid React re-triggering Three.js loop
  const animStateRef = useRef({
    isPlaying: true,
    wireframeOnly: false,
    speed: 1,
    targetRotationY: 0,
    targetRotationX: 0,
    currentRotationY: 0,
    currentRotationX: 0,
    theme: theme,
    pulseVal: 0
  });

  // Keep state ref updated
  useEffect(() => {
    animStateRef.current.isPlaying = isPlaying;
    animStateRef.current.wireframeOnly = wireframeOnly;
    animStateRef.current.speed = speedMultiplier;
    animStateRef.current.theme = theme;
  }, [isPlaying, wireframeOnly, speedMultiplier, theme]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const isDark = theme === 'dark';
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Group for the entire cyber core
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Color definitions based on theme
    const primaryColor = isDark ? 0x06b6d4 : 0x0284c7; // Cyan / Sky
    const secondaryColor = isDark ? 0x6366f1 : 0x4f46e5; // Indigo
    const accentColor = isDark ? 0x10b981 : 0x059669; // Emerald
    const particleColor = isDark ? 0xa5f3fc : 0x0369a1;

    // 1. Central Icosahedron Inner Core
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: primaryColor,
      wireframe: true,
      roughness: 0.3,
      metalness: 0.8,
      transparent: true,
      opacity: 0.75
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // 2. Solid Inner Nucleus with Point Lights
    const innerNucleusGeo = new THREE.OctahedronGeometry(0.7, 1);
    const innerNucleusMat = new THREE.MeshStandardMaterial({
      color: secondaryColor,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: false,
      transparent: true,
      opacity: 0.85
    });
    const innerNucleus = new THREE.Mesh(innerNucleusGeo, innerNucleusMat);
    mainGroup.add(innerNucleus);

    // 3. Orbital Data Rings
    const ringGroup = new THREE.Group();
    mainGroup.add(ringGroup);

    const ringCount = 3;
    const ringMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < ringCount; i++) {
      const radius = 2.4 + i * 0.45;
      const ringGeo = new THREE.TorusGeometry(radius, 0.02, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: i === 0 ? primaryColor : i === 1 ? secondaryColor : accentColor,
        transparent: true,
        opacity: 0.55
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = (Math.PI / (i + 2)) * (i % 2 === 0 ? 1 : -1);
      ringMesh.rotation.y = (Math.PI / 3) * i;
      ringGroup.add(ringMesh);
      ringMeshes.push(ringMesh);

      // Add orbiting satellite node to each ring
      const satelliteGeo = new THREE.SphereGeometry(0.09, 12, 12);
      const satelliteMat = new THREE.MeshBasicMaterial({
        color: 0xffffff
      });
      const satellite = new THREE.Mesh(satelliteGeo, satelliteMat);
      satellite.position.set(radius, 0, 0);
      ringMesh.add(satellite);
    }

    // 4. Particle Constellation (Tunnel Data Packets)
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const r = 2.0 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      scales[i] = Math.random() * 0.05 + 0.02;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: particleColor,
      size: 0.055,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // 5. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.6 : 0.9);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(primaryColor, isDark ? 2.5 : 3.5, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(secondaryColor, isDark ? 2 : 3, 20);
    pointLight2.position.set(-5, -4, -3);
    scene.add(pointLight2);

    // 6. Grounding Contact Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x020617 : 0x94a3b8,
      transparent: true,
      opacity: isDark ? 0.35 : 0.15,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -3.1;
    scene.add(shadowMesh);

    // Mouse / Pointer Tracking for Interactive Tilt
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      animStateRef.current.targetRotationY = x * 0.55;
      animStateRef.current.targetRotationX = y * 0.4;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        animStateRef.current.targetRotationY = x * 0.55;
        animStateRef.current.targetRotationX = y * 0.4;
      }
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop with Clock & Exponential Damping
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);
      const state = animStateRef.current;

      // Update wireframe state smoothly
      innerNucleusMat.wireframe = state.wireframeOnly;

      if (state.isPlaying) {
        const speed = state.speed;

        // Rotate main group base
        mainGroup.rotation.y += 0.007 * speed;
        innerNucleus.rotation.x += 0.012 * speed;
        innerNucleus.rotation.z -= 0.009 * speed;

        // Rotate orbital rings at differing rates
        ringMeshes.forEach((mesh, idx) => {
          mesh.rotation.z += (0.01 + idx * 0.005) * speed;
        });

        // Pulsate particles
        particles.rotation.y -= 0.003 * speed;
        particles.rotation.x += 0.001 * speed;

        // Core breathing scale
        state.pulseVal += delta * 2;
        const scaleVal = 1 + Math.sin(state.pulseVal) * 0.04;
        coreMesh.scale.set(scaleVal, scaleVal, scaleVal);
      }

      // Smooth exponential damping toward pointer tilt
      state.currentRotationY = THREE.MathUtils.damp(
        state.currentRotationY,
        state.targetRotationY,
        4.0,
        delta
      );
      state.currentRotationX = THREE.MathUtils.damp(
        state.currentRotationX,
        state.targetRotationX,
        4.0,
        delta
      );

      mainGroup.rotation.y = (mainGroup.rotation.y + state.currentRotationY * 0.03);
      mainGroup.rotation.x = state.currentRotationX * 0.4;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('touchmove', handleTouchMove);

      // Dispose Geometries and Materials
      coreGeo.dispose();
      coreMat.dispose();
      innerNucleusGeo.dispose();
      innerNucleusMat.dispose();
      ringMeshes.forEach((mesh) => {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          mesh.material.dispose();
        }
      });
      particleGeo.dispose();
      particleMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme]);

  // Labels for interactive HUD dock
  const labels = {
    fa: {
      title: 'هاب تعاملی سه‌بعدی شبکه و DNS',
      play: 'پخش چرخش',
      pause: 'توقف',
      wireframe: 'حالت مش سیمی',
      solid: 'حالت هسته توپر',
      speed: 'سرعت',
      reset: 'تنظیم مجدد'
    },
    en: {
      title: 'Interactive 3D Network & DNS Hub',
      play: 'Play Rotation',
      pause: 'Pause',
      wireframe: 'Wireframe Mode',
      solid: 'Solid Core Mode',
      speed: 'Speed',
      reset: 'Reset View'
    }
  }[lang];

  return (
    <div className="relative w-full h-full min-h-[420px] lg:min-h-[520px] flex items-center justify-center overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-900/60 to-slate-950/80 shadow-2xl">
      {/* WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
        aria-label={labels.title}
      />

      {/* Subtle Top-Corner Title & Status */}
      <div className="absolute top-4 start-4 flex items-center gap-2 text-xs text-slate-400 select-none pointer-events-none">
        <span className="font-mono text-cyan-400 font-medium">3D // MESH_NODE</span>
        <span>·</span>
        <span>{lang === 'fa' ? 'گراف پردازشی شبکه' : 'Network Graph'}</span>
      </div>

      {/* Sleek Minimal Control Dock (Pinned at bottom center, zero central occlusion) */}
      <div className="absolute bottom-4 inset-x-4 max-w-sm mx-auto flex items-center justify-between p-1.5 rounded-xl bg-slate-900/90 border border-slate-700/60 text-slate-300 text-xs shadow-lg backdrop-blur-none">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? labels.pause : labels.play}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setWireframeOnly(!wireframeOnly)}
            title={wireframeOnly ? labels.solid : labels.wireframe}
            className={`p-1.5 rounded-lg transition-colors ${
              wireframeOnly ? 'bg-cyan-500/20 text-cyan-400' : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              const speeds = [0.5, 1, 1.8];
              const nextIndex = (speeds.indexOf(speedMultiplier) + 1) % speeds.length;
              setSpeedMultiplier(speeds[nextIndex]);
            }}
            className="px-2 py-1 rounded-lg hover:bg-slate-800 font-mono text-[11px] text-slate-300 transition-colors"
            title={labels.speed}
          >
            {speedMultiplier}x
          </button>
        </div>

        <div className="text-[11px] text-slate-400 font-mono">
          <span>{lang === 'fa' ? 'برای چرخش ماوس را تکان دهید' : 'Move cursor to inspect'}</span>
        </div>
      </div>
    </div>
  );
};
