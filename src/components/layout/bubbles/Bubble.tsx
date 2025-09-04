"use client";
import React, { useRef, useEffect } from "react";

interface Bubble {
  x: number;
  y: number;
  radius: number;
  targetRadius: number;
  speed: number;
  drift: number;
  opacity: number;
  growDelay: number;
  growSpeed: number;
  rotation: number;
  rotationSpeed: number;
  popDelay: number;
  isPopping: boolean;
  popProgress: number;
  particles?: Particle[];
  canPop: boolean;
}

interface Particle {
  x: number;
  y: number;
  angle: number;
  speed: number;
  radius: number;
  opacity: number;
  life: number;
  maxLife: number;
}

const BUBBLE_COUNT = 13;
const PARTICLE_COUNT = 12;

function randomBubble(width: number, height: number): Bubble {
  const targetRadius = 10 + Math.random() * 20;
  return {
    x: Math.random() * width,
    y: height + Math.random() * height * 0.2,
    radius: 0,
    targetRadius,
    speed: 0.5 + Math.random() * 1.2,
    drift: (Math.random() - 0.5) * 0.5,
    opacity: 0.3 + Math.random() * 0.4,
    growDelay: Math.random() * 60,
    growSpeed: 0.2 + Math.random() * 0.3,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.03,
    popDelay: 240 + Math.random() * 180,
    isPopping: false,
    popProgress: 0,
    particles: [],
    canPop: Math.random() < 0.7, //70% chance it will pop
  };
}
function createParticles(bubble: Bubble): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const angle = (2 * Math.PI * i) / PARTICLE_COUNT;
    // Each particle will travel up to bubble.radius
    const maxLife = 18 + Math.random() * 6;
    const speed = (bubble.radius * 1.2) / maxLife;
    particles.push({
      x: bubble.x,
      y: bubble.y,
      angle,
      speed,
      radius: 1.5 + Math.random() * 2,
      opacity: 1,
      life: 0,
      maxLife,
    });
  }
  return particles;
}

const BubbleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const bubblesRef = useRef<Bubble[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.parentElement?.clientHeight || window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    bubblesRef.current = Array.from({ length: BUBBLE_COUNT }, () =>
      randomBubble(width, height)
    );

    function drawBubble(bubble: Bubble) {
      if (!ctx) return;
      if (bubble.isPopping && bubble.particles && bubble.particles.length > 0) {
        // Don't draw the bubble itself while popping
        return;
      }
      ctx.save();
      ctx.globalAlpha = bubble.opacity;
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.radius, 0, 2 * Math.PI);
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#fff";
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.restore();

      // Doodle effect
      ctx.save();
      ctx.globalAlpha = bubble.opacity * 0.7;
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1;
      ctx.translate(bubble.x, bubble.y);
      ctx.rotate(bubble.rotation);
      for (let i = 0; i < 2; i++) {
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2; a += 0.2) {
          const r = bubble.radius * (0.7 + 0.08 * Math.sin(a * 3 + i));
          const x = r * Math.cos(a);
          const y = r * Math.sin(a);
          if (a === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawParticles(particles: Particle[]) {
      if (!ctx) return;
      particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      });
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      bubblesRef.current.forEach((bubble) => {
        // Growth with delay
        if (bubble.growDelay > 0) {
          bubble.growDelay--;
        } else if (bubble.radius < bubble.targetRadius && !bubble.isPopping) {
          bubble.radius = Math.min(
            bubble.targetRadius,
            bubble.radius + bubble.growSpeed
          );
        }

        // Rotation
        bubble.rotation += bubble.rotationSpeed;

        // Movement
        if (!bubble.isPopping) {
          bubble.y -= bubble.speed;
          bubble.x += bubble.drift;
        }

        // Pop logic
        if (!bubble.isPopping) {
          if (bubble.canPop) {
            bubble.popDelay--;
            if (bubble.popDelay <= 0) {
              bubble.isPopping = true;
              bubble.popProgress = 0;
              bubble.particles = createParticles(bubble);
            }
          }
        } else if (bubble.particles && bubble.particles.length > 0) {
          // Animate particles
          let allDead = true;
          bubble.particles.forEach((p) => {
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            p.life++;
            p.opacity = Math.max(0, 1 - p.life / p.maxLife);
            if (p.life < p.maxLife) allDead = false;
          });
          drawParticles(bubble.particles);

          if (allDead) {
            // Respawn bubble
            Object.assign(bubble, randomBubble(width, height));
            bubble.y = height + bubble.radius;
          }
        }

        if (!bubble.isPopping) {
          if (bubble.y + bubble.radius < 0) {
            // Respawn at bottom
            Object.assign(bubble, randomBubble(width, height));
            bubble.y = height + bubble.radius;
          }
          drawBubble(bubble);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    function handleResize() {
      if (!canvas) return;
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      bubblesRef.current.forEach((bubble) => {
        bubble.x = Math.random() * width;
        bubble.y = Math.random() * height;
      });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
        display: "block",
      }}
    />
  );
};

export default BubbleCanvas;
