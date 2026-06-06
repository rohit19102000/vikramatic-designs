'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroCanvasProps {
  mousePos: { x: number; y: number };
}

export default function HeroCanvas({ mousePos }: HeroCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  // Store mousePos in a ref so the animation loop always reads the latest value
  const mousePosRef = useRef(mousePos);

  useEffect(() => {
    mousePosRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ─────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 7;

    // ── Particle Field ─────────────────────────────────────────────
    const PARTICLE_COUNT = 2000;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xe94560,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── Wireframe Icosahedron ──────────────────────────────────────
    const icoGeo = new THREE.IcosahedronGeometry(3, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xe94560,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    scene.add(icosahedron);

    // ── Animation Loop ─────────────────────────────────────────────
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const mp = mousePosRef.current;

      particles.rotation.y = t * 0.04 + mp.x * 0.3;
      particles.rotation.x = t * 0.02 + mp.y * 0.2;

      icosahedron.rotation.x = t * 0.05 + mp.y * 0.15;
      icosahedron.rotation.z = t * 0.03 + mp.x * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize handler ─────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ── Cleanup ────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []); // runs once — mousePos is tracked via ref

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
    />
  );
}
