import {
  Scene,
  Color,
  PerspectiveCamera,
  WebGLRenderer,
  BufferGeometry,
  BufferAttribute,
  ShaderMaterial,
  Points,
  SphereGeometry,
  Mesh,
  PlaneGeometry,
  Vector3,
  Group,
} from "three";

import * as shader from "./glsl";

import { fibonacciSphere, createCanvasTextTexture } from "./utils";

const animateFns: ((time: number) => void)[] = [];

const scene = new Scene();

const camera = new PerspectiveCamera(75, 1, 0.1, 1000);

const renderer = new WebGLRenderer({
  antialias: true,
  canvas: document.querySelector("canvas")!,
});

const container = document.body;

const windowResize = () => {
  const { clientWidth, clientHeight } = container;

  const ratio = clientWidth / clientHeight;
  camera.aspect = ratio;
  camera.position.z = 17;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(clientWidth, clientHeight);
  camera.updateProjectionMatrix();
};

renderer.setAnimationLoop((time) => {
  animateFns.forEach((fn) => fn(time));
  renderer.render(scene, camera);
});

window.addEventListener("resize", windowResize);

windowResize();

camera.lookAt(new Vector3(0, 0, 0));

scene.background = new Color(0x080808);

if (import.meta.env.DEV) {
  const { default: Stats } = await import("three/addons/libs/stats.module.js");

  const stats = new Stats();

  container.appendChild(stats.dom);

  animateFns.push(() => {
    stats.update();
  });
}

// -----------------------------------------------------------------

/** 创建围绕的噪声旁边的粒子 */

const sunParticleCount = 2500;
const sunParticlePoints = fibonacciSphere(sunParticleCount, 6);
const sunParticlePositions = new Float32Array(sunParticleCount * 3);

sunParticlePoints.forEach(({ x, y, z }, i) => {
  const index = i * 3;
  sunParticlePositions[index] = x;
  sunParticlePositions[index + 1] = y;
  sunParticlePositions[index + 2] = z;
});

const sunParticlesGeometry = new BufferGeometry();

sunParticlesGeometry.setAttribute(
  "position",
  new BufferAttribute(sunParticlePositions, 3),
);

const sunParticleShaderMaterial = new ShaderMaterial({
  uniforms: {
    uTime: { value: 0.0 },
  },
  vertexShader: shader.sunParticleVs,
  fragmentShader: shader.sunParticleFs,
  depthWrite: false,
  transparent: true,
});

const sunParticle = new Points(sunParticlesGeometry, sunParticleShaderMaterial);

// scene.add(sunParticle);

animateFns.unshift((time) => {
  // sunParticle.rotation.y += 0.001;
  sunParticleShaderMaterial.uniforms.uTime.value = time;
});

// -----------------------------------------------------------------

/** 中间的黄色噪音 */

const sunSphereGeometry = new SphereGeometry(2.8, 120, 120);

const sunSphereMaterial = new ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
  },
  vertexShader: shader.sunVs,
  fragmentShader: shader.sunFs,
});

const sunSphere = new Mesh(sunSphereGeometry, sunSphereMaterial);

// scene.add(sunSphere);

animateFns.unshift((time) => {
  sunSphereMaterial.uniforms.uTime.value = time;
});

// -----------------------------------------------------------------

/** 噪音标题 */

const titleTexture = createCanvasTextTexture({
  text: "LEYAOYAO FE",
});

const titleGeometryBaseHeight = 1;
const titlAspectRatio = titleTexture.image.width / titleTexture.image.height;

const titleGeometry = new PlaneGeometry(
  titleGeometryBaseHeight * titlAspectRatio,
  titleGeometryBaseHeight,
  64,
  64,
);

const titleMaterial = new ShaderMaterial({
  uniforms: {
    uTexture: { value: titleTexture },
    uTime: { value: 0 },
  },
  vertexShader: shader.titleVs,
  fragmentShader: shader.titleFs,
  transparent: true,
  depthWrite: false,
});

const titlePlane = new Mesh(titleGeometry, titleMaterial);

titlePlane.position.z = 5.5;

// scene.add(titlePlane);

animateFns.unshift((time) => {
  titleMaterial.uniforms.uTime.value = time;
});

// -----------------------------------------------------------------

/** 背景烟雾 */

const smokeConut = 1500;
const smokeParticlePositions = new Float32Array(smokeConut * 3);

for (let i = 0; i < smokeConut; i++) {
  const index = i * 3;
  const scal = 100;
  smokeParticlePositions[index] = (Math.random() - 0.5) * scal;
  smokeParticlePositions[index + 1] = (Math.random() - 0.5) * scal;
  smokeParticlePositions[index + 2] = (Math.random() - 0.5) * scal;
}

const smokeParticlesGeometry = new BufferGeometry();

smokeParticlesGeometry.setAttribute(
  "position",
  new BufferAttribute(smokeParticlePositions, 3),
);

const smokeParticleShaderMaterial = new ShaderMaterial({
  uniforms: {
    uTime: { value: 0.0 },
  },
  vertexShader: shader.smokeVs,
  fragmentShader: shader.smokeFs,
  depthWrite: false,
  transparent: true,
});

const smokeParticle = new Points(
  smokeParticlesGeometry,
  smokeParticleShaderMaterial,
);

scene.add(smokeParticle);

animateFns.unshift((time) => {
  const speed = 0.00008;
  smokeParticle.rotation.y += speed;
  smokeParticle.rotation.x += speed;
  smokeParticle.rotation.z += speed;
  smokeParticleShaderMaterial.uniforms.uTime.value = time;
});

// -----------------------------------------------------------------

/** 鼠标滑动 旋转 */

const mouseGroup = new Group();

mouseGroup.add(sunSphere, sunParticle, titlePlane);

scene.add(mouseGroup);

const mouseGroupTarget = { x: 0, y: 0 };

const updateCameraPos = (delay = true) => {
  const rotation = mouseGroup.rotation;
  const { x, y } = mouseGroupTarget;

  if (delay) {
    rotation.x += (y - rotation.x) * 0.02;
    rotation.y += (-x - rotation.y) * 0.02;
  } else {
    rotation.x = y;
    rotation.y = -x;
  }
};

container.addEventListener("mousemove", (e) => {
  const { clientWidth, clientHeight } = container;

  mouseGroupTarget.x = (clientWidth / 2 - e.clientX) * 0.0002;
  mouseGroupTarget.y = (e.clientY - clientHeight / 2) * 0.0002;
});

animateFns.unshift(() => {
  updateCameraPos();
});

// -----------------------------------------------------------------
