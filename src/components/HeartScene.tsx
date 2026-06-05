"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/models/heart.glb");

const _wp = new THREE.Vector3();
const _wq = new THREE.Quaternion();
const _ws = new THREE.Vector3();
const _center = new THREE.Vector3();
const _size = new THREE.Vector3();

function buildEdges(root: THREE.Object3D) {
  const group = new THREE.Group();

  root.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh || !mesh.geometry) return;

    const geo = mesh.geometry.clone();
    const edgesGeo = new THREE.EdgesGeometry(geo);
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color("#60a5fa"),
      transparent: true,
      opacity: 0.25,
    });
    const line = new THREE.LineSegments(edgesGeo, material);

    mesh.getWorldPosition(_wp);
    mesh.getWorldQuaternion(_wq);
    mesh.getWorldScale(_ws);
    line.position.copy(_wp);
    line.quaternion.copy(_wq);
    line.scale.copy(_ws);

    group.add(line);
  });

  const box = new THREE.Box3().setFromObject(group);
  if (!box.isEmpty()) {
    const center = box.getCenter(_center);
    const size = box.getSize(_size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const s = maxDim > 0 ? 2.6 / maxDim : 1;
    for (const child of group.children) {
      child.position.sub(center);
    }
    group.scale.setScalar(s);
  }

  return group;
}

function HeartModel() {
  const { scene } = useGLTF("/models/heart.glb");
  const groupRef = React.useRef<THREE.Group>(null);
  const baseScaleRef = React.useRef(1);

  React.useEffect(() => {
    if (!groupRef.current) return;

    const group = groupRef.current;

    while (group.children.length) {
      const child = group.children[0];
      if ((child as THREE.LineSegments).geometry) {
        (child as THREE.LineSegments).geometry.dispose();
        ((child as THREE.LineSegments).material as THREE.Material).dispose();
      }
      group.remove(child);
    }

    group.position.set(0, 0, 0);
    group.rotation.set(0, 0, 0);
    group.scale.set(1, 1, 1);

    const edges = buildEdges(scene);

    while (edges.children.length) {
      group.add(edges.children[0]);
    }

    group.scale.copy(edges.scale);
    baseScaleRef.current = edges.scale.x;
  }, [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.2;
    groupRef.current.rotation.z = Math.cos(t * 0.15) * 0.15;
    groupRef.current.position.y = Math.sin(t * 0.25) * 0.08;

    const tMod = t % 1.5;
    const amp = 0.02;
    let pump = 1;

    const lubPhase = tMod / 0.12;
    if (lubPhase < 1) {
      pump -= amp * 0.6 * Math.sin(lubPhase * Math.PI);
    }

    const dubPhase = (tMod - 0.2) / 0.1;
    if (dubPhase >= 0 && dubPhase < 1) {
      pump -= amp * 0.4 * Math.sin(dubPhase * Math.PI);
    }

    groupRef.current.scale.setScalar(baseScaleRef.current * pump);
  });

  return <group ref={groupRef} />;
}

export function HeartScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      className="w-full h-full"
    >
      <React.Suspense fallback={null}>
        <HeartModel />
      </React.Suspense>
    </Canvas>
  );
}
