/**
 * Easter Egg Component
 * 
 * Displays celebration overlay when the Konami code is activated.
 * Shows achievement badge, particles, and sparkles.
 */

import React, { useEffect, useRef } from 'react';

interface EasterEggProps {
  isActive: boolean;
  onClose: () => void;
}

const PARTICLE_COLORS = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#ffd700', '#00ff87'];

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
}

const EasterEgg: React.FC<EasterEggProps> = ({ isActive, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = React.useState<Particle[]>([]);
  const [sparkles, setSparkles] = React.useState<Sparkle[]>([]);

  // Generate particles and sparkles when activated
  useEffect(() => {
    if (isActive) {
      // Generate particles
      const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]
      }));
      setParticles(newParticles);

      // Generate sparkles
      const newSparkles: Sparkle[] = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      }));
      setSparkles(newSparkles);

      // Listen for ESC key
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEsc);

      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    } else {
      setParticles([]);
      setSparkles([]);
    }
  }, [isActive, onClose]);

  // Handle click to close
  const handleClick = () => {
    onClose();
  };

  if (!isActive) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-label="Chaos Master Achievement Unlocked"
      className="fixed inset-0 bg-black/85 flex flex-col items-center justify-center z-[10000] animate-fade-in"
      onClick={handleClick}
    >
      {/* Achievement Badge */}
      <div className="flex flex-col items-center p-10">
        {/* Trophy Icon */}
        <div 
          className="w-[200px] h-[200px] rounded-full flex items-center justify-center mb-10 animate-badge-pulse"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 0 60px rgba(102, 126, 234, 0.8)'
          }}
        >
          <div 
            className="text-[80px]"
            style={{ filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))' }}
          >
            🏆
          </div>
        </div>

        {/* Title */}
        <h1 
          className="text-5xl font-bold mb-5 animate-bounce-in"
          style={{
            background: 'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center'
          }}
        >
          Chaos Master
        </h1>

        {/* Message */}
        <p className="text-3xl text-white text-center mb-8 animate-fade-in-delay-1">
          🎉 You found the chaos! 🎉
        </p>

        {/* Instructions */}
        <p className="text-lg text-gray-400 text-center animate-fade-in-delay-2">
          Press ESC or click anywhere to close
        </p>
      </div>

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed w-[10px] h-[10px] rounded-full pointer-events-none z-[10001] animate-particle-explode"
          style={{
            left: particle.x,
            top: particle.y,
            background: particle.color,
            animationDelay: `${particle.id * 50}ms`
          }}
        />
      ))}

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="fixed text-2xl pointer-events-none z-[10001] animate-sparkle-float"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            animationDelay: `${sparkle.id * 100}ms`
          }}
        >
          ✨
        </div>
      ))}

      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes badge-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 60px rgba(102, 126, 234, 0.8);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 80px rgba(102, 126, 234, 1);
          }
        }
        
        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes fade-in-delay-1 {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-delay-2 {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes particle-explode {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(3) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes sparkle-float {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: scale(0) rotate(360deg) translateY(-100px);
            opacity: 0;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-badge-pulse {
          animation: badge-pulse 1s ease-in-out infinite;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
        
        .animate-fade-in-delay-1 {
          animation: fade-in-delay-1 0.5s ease-out 0.3s both;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in-delay-2 0.5s ease-out 0.5s both;
        }
        
        .animate-particle-explode {
          animation: particle-explode 1s ease-out forwards;
        }
        
        .animate-sparkle-float {
          animation: sparkle-float 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default EasterEgg;
