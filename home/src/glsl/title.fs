uniform sampler2D uTexture; // 采样纹理
varying vec2 vUv;

void main() {
  vec4 texture = texture2D(uTexture, vUv);

  vec4 color = vec4(texture.rgb, texture.a * 1.0);

  gl_FragColor = color; // 根据 UV 采样纹理
}
