// src/utils/GetFlatGeometry.js
import * as THREE from 'three';
import g from '@/assets/gradient.png';

export default function GetFlatGeometry() {
  const AMOUNTX = 70;
  const AMOUNTY = 70;
  const SEPARATION = 100;
  const numParticles = AMOUNTX * AMOUNTY;
  const vertices = new Float32Array(numParticles * 3);   //存储每个粒子的三维坐标 每三个下标一组[x,y,z]
  const scales = new Float32Array(numParticles);         //存储每个粒子的缩放值



  const TextureLoader = new THREE.TextureLoader();
  const material = new THREE.PointsMaterial({
    size: 5,
    sizeAttenuation: false,
    transparent: true,
    opacity: 1,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    map: TextureLoader.load(g)
  });


  let i = 0;
  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      vertices[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2; // x
      vertices[i + 1] = 0; // y，初始值为 0，后续动态更新
      vertices[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2; // z
      i += 3;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

  const points = new THREE.Points(geometry, material);
  return points;
}