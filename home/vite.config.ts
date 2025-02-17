import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
import { compression } from "vite-plugin-compression2";

export default defineConfig({
  base: "/",
  plugins: [glsl(), compression({ algorithm: "brotliCompress" })],
});
