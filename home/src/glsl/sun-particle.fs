void main() {
  // 使用圆形裁剪，使粒子边缘变为透明
  float dist = length(gl_PointCoord - vec2(0.5));

  if (dist > 0.5) discard;

  vec3 color = vec3(220.0, 244.0, 255.0) / 255.0;

  float alpha = 0.6 - dist * 2.0;

  // 设置透明渐变
  gl_FragColor = vec4(color, alpha);
}
