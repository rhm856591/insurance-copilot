'use client';

import { useEffect, useRef } from 'react';

interface ParticlesBackgroundProps {
  backgroundColor?: string;
  gradientColor1?: string;
  gradientColor2?: string;
  particleColor?: string;
  overlayGradientFrom?: string;
  noiseOpacity?: string;
}

export function ParticlesBackground({
  backgroundColor = '#070707',
  gradientColor1 = 'rgba(59, 91, 219, 0.12)',
  gradientColor2 = 'rgba(59, 91, 219, 0.12)',
  particleColor = '255, 255, 255',
  overlayGradientFrom = 'black/80',
  noiseOpacity = 'opacity-20',
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    const createParticles = () => {
      const particleCount = 200;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 0.5,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`;
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [particleColor]);

  return (
    <>
      {/* Animated Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: backgroundColor,
          backgroundImage: `radial-gradient(circle at 100% 0%, ${gradientColor1} 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, ${gradientColor2} 0%, transparent 50%)`,
        }}
      />

      {/* Noise Texture */}
      <div
        className={`absolute inset-0 ${noiseOpacity}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ opacity: 0.7 }}
      />

      {/* Gradient Overlay at Bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t"
        style={{
          backgroundImage: `linear-gradient(to top, ${overlayGradientFrom}, transparent)`,
        }}
      />
    </>
  );
}
