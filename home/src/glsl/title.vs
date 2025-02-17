varying vec2 vUv;
uniform float uTime;

void main() {
  vUv = uv;

  float speed = uTime / 100.0 * 0.25;

  vec3 newposition = position;

  newposition.z -= abs(newposition.x) * 0.15;

  newposition += sin(position + speed) * 0.08;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newposition, 1.0);
}
