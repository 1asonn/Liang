varying float noise;
varying vec3 vNormal;

void main() {
  float intensity = dot(vNormal, vec3(0.0, 150.0, 0.0));

  vec3 color = vec3(238.0, 130.0 + noise * 255.0 * 0.5, 17.0) / 255.0;

  gl_FragColor = vec4(color, 1.0);
}
