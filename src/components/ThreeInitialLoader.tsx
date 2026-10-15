import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Terminal, Shield, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface ThreeInitialLoaderProps {
  onComplete: () => void;
  lang: Language;
}

export const ThreeInitialLoader: React.FC<ThreeInitialLoaderProps> = ({ onComplete, lang }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const logs = {
    fa: [
      'راه‌اندازی ماژول‌های هسته لینوکس و بافرهای شبکه...',
      'اتصال امن به نودهای DNS over TLS (DoT) و تست تاخیر...',
      'مقداردهی اولیه هسته سه‌بعدی Three.js و گرافیک WebGL...',
      'همگام‌سازی مخازن متن‌باز گیت‌هاب (hosseinit1988)...',
      'آماده‌سازی پایگاه خبری تکنولوژی و ترمینال لینوکس...',
      'سیستم آماده است! ورود به وب‌سایت...'
    ],
    en: [
      'Booting Linux kernel modules and socket network buffers...',
      'Establishing secure DNS over TLS (DoT) resolution handshake...',
      'Initializing Three.js 3D WebGL spatial rendering engine...',
      'Synchronizing open-source repositories from hosseinit1988...',
      'Mounting technical news portal and interactive shell...',
      'System Ready! Launching user interface...'
    ]
  }[lang];

  // 3D Scene Inside Loader
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group
    const group = new THREE.Group();
    scene.add(group);

    // 1. Outer Gyroscope Torus
    const torusGeo = new THREE.TorusGeometry(1.4, 0.03, 16, 80);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    group.add(torus);

    // 2. Middle Gyroscope Ring (Tilted)
    const midRingGeo = new THREE.TorusGeometry(1.1, 0.025, 16, 70);
    const midRingMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.75
    });
    const midRing = new THREE.Mesh(midRingGeo, midRingMat);
    midRing.rotation.x = Math.PI / 3;
    group.add(midRing);

    // 3. Inner Rotating Wireframe Octahedron
    const octGeo = new THREE.OctahedronGeometry(0.7, 1);
    const octMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.9
    });
    const oct = new THREE.Mesh(octGeo, octMat);
    group.add(oct);

    // 4. Central Glowing Core Sphere
    const sphereGeo = new THREE.SphereGeometry(0.25, 16, 16);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x10b981
    });
    const coreSphere = new THREE.Mesh(sphereGeo, sphereMat);
    group.add(coreSphere);

    // 5. Orbiting particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 1.3 + Math.random() * 0.5;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = Math.sin(angle) * r;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xa5f3fc,
      size: 0.045,
      transparent: true,
      opacity: 0.85
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      group.rotation.y += delta * 1.4;
      torus.rotation.x += delta * 0.9;
      midRing.rotation.y += delta * 1.1;
      oct.rotation.z -= delta * 1.2;
      oct.rotation.x += delta * 0.8;
      particles.rotation.z += delta * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      torusGeo.dispose();
      torusMat.dispose();
      midRingGeo.dispose();
      midRingMat.dispose();
      octGeo.dispose();
      octMat.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Progressive timer increment for loading progress
  useEffect(() => {
    const startTime = Date.now();
    const duration = 2400; // 2.4 seconds loading duration

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      // Determine current log index
      const logStep = Math.min(Math.floor((pct / 100) * (logs.length - 1)), logs.length - 1);
      setLogIndex(logStep);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(onComplete, 500);
        }, 300);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [logs.length, onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(onComplete, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-slate-100 transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Matrix/Grid Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center space-y-6">
        {/* 3D Canvas Mount Frame */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div ref={mountRef} className="w-full h-full flex items-center justify-center" />
          {/* Radial Glow underneath */}
          <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />
        </div>

        {/* Engineer Title & Loading Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>HOSSEIN_IT // SYSTEM_BOOT</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {lang === 'fa' ? 'حسین شورگشتی' : 'Hossein Shorgooshti'}
          </h2>
          <p className="text-xs text-slate-400">
            {lang === 'fa'
              ? 'پرتفولیو لینوکس، شبکه و پایگاه خبری تکنولوژی'
              : 'DevOps, Network Infrastructure & Tech News Portal'}
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="text-cyan-400">STATUS: BOOTING</span>
            <span className="font-bold text-white tabular-nums">{progress}%</span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 rounded-full transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Dynamic Log Text */}
        <div className="h-6 flex items-center justify-center text-xs font-mono text-slate-400">
          <Terminal className="w-3.5 h-3.5 text-cyan-400 me-2 shrink-0" />
          <span className="truncate">{logs[logIndex]}</span>
        </div>

        {/* Skip Button */}
        <div className="pt-2">
          <button
            onClick={handleSkip}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-cyan-300 border border-slate-800 hover:border-slate-700 bg-slate-900/60 transition-colors"
          >
            <span>{lang === 'fa' ? 'ورود سریع (رد کردن لودینگ)' : 'Skip Intro'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
