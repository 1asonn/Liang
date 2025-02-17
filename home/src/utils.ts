import { CanvasTexture } from "three";

// 斐波那契球体采样公式
export const fibonacciSphere = (samples: number, radius: number) => {
  const points: { x: number; y: number; z: number }[] = [];
  const offset = 2 / samples;
  const increment = Math.PI * (3 - Math.sqrt(5)); // 斐波那契数的黄金角

  for (let i = 0; i < samples; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - y * y);

    const phi = i * increment;

    const x = Math.cos(phi) * r * radius;
    const z = Math.sin(phi) * r * radius;

    points.push({ x, y: y * radius, z });
  }

  return points;
};

/** 创建文字纹理 */
export const createCanvasTextTexture = ({ text = "", fontSize = 100 }) => {
  const canvas = new OffscreenCanvas(0, 0);
  const context = canvas.getContext("2d")!;
  context.font = `${fontSize}px Arial, Helvetica, sans-serif`;

  canvas.width = Math.ceil(context.measureText(text).width);
  canvas.height = fontSize;

  context.font = `${fontSize}px Arial`;
  context.fillStyle = "white";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  return new CanvasTexture(canvas);
};
