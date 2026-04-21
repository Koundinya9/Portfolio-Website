'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentRole, setCurrentRole] = useState(0);
  const [fade, setFade] = useState(true);

  const roles = [
    "I'm an AI Engineer",
    "I'm a Data Scientist",
    "I'm an ML Engineer",
    "I'm a Software Developer",
    "I'm an LLM Specialist"
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 100;
    const mouse = { x: 0, y: 0 };
    const connectionDistance = 150;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(100, 149, 237, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.fillStyle = 'rgba(17, 24, 39, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      particles.forEach((particle, i) => {
        // Connect to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x;
          const dy = particle.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.strokeStyle = `rgba(100, 149, 237, ${1 - distance / connectionDistance})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Connect to mouse
        const dxMouse = particle.x - mouse.x;
        const dyMouse = particle.y - mouse.y;
        const distanceToMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distanceToMouse < connectionDistance) {
          ctx.strokeStyle = `rgba(220, 38, 38, ${1 - distanceToMouse / connectionDistance})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setFade(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden bg-gray-900">
        <canvas ref={canvasRef} className="absolute inset-0" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl md:text-7xl font-light mb-6">
          <span className="text-white">Hello, I'm </span>
          <span className="text-red-500 font-normal">Koundinya</span>
        </h1>

        <p
          className={`text-2xl md:text-4xl text-white font-light mb-12 transition-opacity duration-300 ${
            fade ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {roles[currentRole]}
        </p>

        <a
          href="#about"
          className="px-8 py-3 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 text-lg flex items-center gap-2"
        >
          View my work
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="min-h-screen bg-gray-900 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* ABOUT Label */}
          <div className="mb-6">
            <span className="text-red-500 text-sm tracking-widest uppercase font-light">ABOUT</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 max-w-4xl">
            AI systems engineer with a data foundation.
          </h2>

          {/* Two Column Content */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div>
              <p className="text-gray-400 text-lg leading-relaxed">
                My background spans machine learning, information retrieval, analytics, and applied software engineering. At Carnegie Mellon, I focused on building AI systems that combine retrieval, reasoning, and business context. In industry, I've worked on enterprise assistants, ad-tech automation, supply-chain tooling, and chatbot retrieval quality.
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-lg leading-relaxed">
                The kind of work I enjoy most sits between product ambiguity and technical rigor: taking a vague business need, designing an architecture around it, and iterating until the system is usable, measurable, and reliable.
              </p>
            </div>
          </div>

          {/* STRENGTHS Section */}
          <div className="mb-6">
            <span className="text-red-500 text-sm tracking-widest uppercase font-light">STRENGTHS</span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-white mb-12">
            Where I create the most leverage.
          </h3>

          {/* Three Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {/* Card 1 */}
            <div className="bg-gray-800 p-8 border border-gray-700 hover:border-red-500 transition-all duration-300">
              <h4 className="text-xl font-bold text-white mb-4">LLM Product Engineering</h4>
              <p className="text-gray-400 leading-relaxed">
                Shipping assistants and workflows that connect frontend experience, backend orchestration, and measurable quality.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-800 p-8 border border-gray-700 hover:border-red-500 transition-all duration-300">
              <h4 className="text-xl font-bold text-white mb-4">Retrieval & Evaluation</h4>
              <p className="text-gray-400 leading-relaxed">
                Designing RAG systems, retrieval strategies, and evaluation loops that reduce hallucinations and improve trust.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-800 p-8 border border-gray-700 hover:border-red-500 transition-all duration-300">
              <h4 className="text-xl font-bold text-white mb-4">Applied ML & Analytics</h4>
              <p className="text-gray-400 leading-relaxed">
                Framing machine learning use cases around actual decisions, not just models, especially in business and operational contexts.
              </p>
            </div>
          </div>

          {/* Social Links & Resume */}
          <div className="flex justify-center gap-6 mt-16">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border-2 border-gray-700 hover:border-red-500 text-gray-400 hover:text-red-500 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border-2 border-gray-700 hover:border-red-500 text-gray-400 hover:text-red-500 transition-all duration-300"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="/resume.pdf"
              className="px-6 py-3 border-2 border-gray-700 hover:border-red-500 text-gray-400 hover:text-red-500 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
