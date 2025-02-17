#include ./noise.glsl;

uniform float uTime;
varying float noise;
varying vec3 vNormal;

void main() {
  vNormal = normalize(normal);

  noise = snoise(position * 10.0 + uTime / 1000. * 0.1);

  vec3 newposition = position * (noise + 0.7);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newposition, 1.0);
}
