uniform float uSize;
uniform float uTime;

void main() {
  // 将粒子位置转换到相机视角
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

  gl_Position = projectionMatrix * mvPosition;

  // 根据深度调整粒子大小
  gl_PointSize = 200.0 / -mvPosition.z;
}
