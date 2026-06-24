import { useEffect, useRef } from 'react';

export default function SilkBackground({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = [
      [44, 24, 16],    // 深胡桃
      [139, 105, 20],  // 金棕
      [201, 169, 110], // 香槟金
      [212, 165, 116], // 原木
      [180, 140, 100], // 暖棕
    ];

    const draw = () => {
      time += 0.003;
      const w = canvas.width;
      const h = canvas.height;

      // 基础渐变
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#1A1210');
      grad.addColorStop(0.5, '#2C1810');
      grad.addColorStop(1, '#1A1210');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // 丝绸波纹
      colors.forEach((color, i) => {
        ctx.beginPath();
        ctx.moveTo(0, h * 0.5);
        for (let x = 0; x <= w; x += 5) {
          const y = h * 0.5 +
            Math.sin(x * 0.003 + time + i * 1.5) * h * 0.15 +
            Math.sin(x * 0.007 + time * 0.7 + i) * h * 0.08 +
            Math.cos(x * 0.002 + time * 0.5 + i * 0.8) * h * 0.05;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();

        const alpha = 0.06 + Math.sin(time + i) * 0.02;
        ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
        ctx.fill();
      });

      // 顶部光晕
      const radialGrad = ctx.createRadialGradient(w * 0.5, h * 0.3, 0, w * 0.5, h * 0.3, w * 0.6);
      radialGrad.addColorStop(0, 'rgba(201, 169, 110, 0.08)');
      radialGrad.addColorStop(1, 'rgba(201, 169, 110, 0)');
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, w, h);

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`silk-bg ${className}`}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  );
}
