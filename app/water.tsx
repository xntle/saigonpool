"use client";

import { useEffect, useRef } from "react";

export type WaterAPI = {
  disturb: (x: number, y: number, strength: number, radius: number) => void;
  heightAt: (x: number, y: number) => number;
  width: () => number;
  height: () => number;
};

export default function WaterCanvas({ apiRef }: { apiRef?: React.MutableRefObject<WaterAPI | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let w = 0, h = 0;
    let buf1: Float32Array, buf2: Float32Array, imageData: ImageData;

    const init = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
      buf1 = new Float32Array(w * h);
      buf2 = new Float32Array(w * h);
      imageData = ctx.createImageData(w, h);
    };
    init();

    const disturb = (cx: number, cy: number, strength: number, radius: number) => {
      const mx = Math.floor(cx), my = Math.floor(cy);
      const r = Math.ceil(radius);
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const nx = mx + dx, ny = my + dy;
          if (nx > 0 && nx < w - 1 && ny > 0 && ny < h - 1) {
            buf1[ny * w + nx] += strength * Math.exp(-(dx * dx + dy * dy) / (radius * radius * 0.5));
          }
        }
      }
    };

    const heightAt = (cx: number, cy: number) => {
      const x = Math.max(1, Math.min(w - 2, Math.floor(cx)));
      const y = Math.max(1, Math.min(h - 2, Math.floor(cy)));
      return buf2[y * w + x];
    };

    if (apiRef) {
      apiRef.current = {
        disturb,
        heightAt,
        width: () => w,
        height: () => h,
      };
    }

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const mx = (e.clientX - r.left) * (w / r.width);
      const my = (e.clientY - r.top) * (h / r.height);
      disturb(mx, my, 800, 28);
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let animId: number;

    const step = () => {
      // Ambient gentle disturbances
      if (Math.random() < 0.15) {
        const rx = 1 + Math.floor(Math.random() * (w - 2));
        const ry = 1 + Math.floor(Math.random() * (h - 2));
        buf1[ry * w + rx] += 40;
      }

      // Propagate ripple simulation
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const i = y * w + x;
          buf2[i] =
            (buf1[(y - 1) * w + x] +
              buf1[(y + 1) * w + x] +
              buf1[y * w + x - 1] +
              buf1[y * w + x + 1]) *
              0.5 -
            buf2[i];
          buf2[i] *= 0.99;
        }
      }

      // Render as semi-transparent blue water overlay
      const d = imageData.data;
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const i = y * w + x;
          const v = buf2[i];
          const pi = i * 4;
          const t = Math.min(1, Math.abs(v) / 120);
          const gx = buf2[y * w + x + 1] - buf2[y * w + x - 1];
          const gy = buf2[(y + 1) * w + x] - buf2[(y - 1) * w + x];
          const spec = Math.max(0, Math.min(1, (gx - gy) / 60));
          d[pi]     = Math.floor(8  + spec * 120);
          d[pi + 1] = Math.floor(28 + t * 55  + spec * 80);
          d[pi + 2] = Math.floor(72 + t * 100 + spec * 140);
          d[pi + 3] = Math.floor(t * 80 + spec * 60);
        }
      }
      ctx.putImageData(imageData, 0, 0);

      const tmp = buf1;
      buf1 = buf2;
      buf2 = tmp;
      animId = requestAnimationFrame(step);
    };
    step();

    const ro = new ResizeObserver(init);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
      if (apiRef) apiRef.current = null;
    };
  }, [apiRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
