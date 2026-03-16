/**
 * Dancing Robot SVG React Component
 * 
 * Renders an animated robot SVG with CSS animations for dancing motion.
 * The robot includes head, torso, arms, and legs with distinct IDs for animation targeting.
 * SVG is responsive and scales fluidly within its container.
 */

import React from 'react';

const DancingRobot: React.FC = () => {
  return (
    <svg
      id="dancing-robot"
      viewBox="0 0 200 300"
      className="dancing-robot"
      role="img"
      aria-label="Dancing robot animation"
    >
      <defs>
        <style>
          {`
            @keyframes robot-bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            
            @keyframes robot-arm-left {
              0%, 100% { transform: rotate(-10deg); }
              25% { transform: rotate(-45deg); }
              75% { transform: rotate(15deg); }
            }
            
            @keyframes robot-arm-right {
              0%, 100% { transform: rotate(10deg); }
              25% { transform: rotate(45deg); }
              75% { transform: rotate(-15deg); }
            }
            
            @keyframes robot-head {
              0%, 100% { transform: rotate(0deg); }
              25% { transform: rotate(-5deg); }
              75% { transform: rotate(5deg); }
            }
            
            @keyframes robot-leg-left {
              0%, 100% { transform: rotate(0deg); }
              25% { transform: rotate(-5deg); }
              75% { transform: rotate(5deg); }
            }
            
            @keyframes robot-leg-right {
              0%, 100% { transform: rotate(0deg); }
              25% { transform: rotate(5deg); }
              75% { transform: rotate(-5deg); }
            }
            
            @keyframes robot-eye-glow {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
            
            .robot-body-group {
              animation: robot-bounce 0.6s ease-in-out infinite;
            }
            
            .robot-arm-left {
              transform-origin: 70px 130px;
              animation: robot-arm-left 0.6s ease-in-out infinite;
            }
            
            .robot-arm-right {
              transform-origin: 130px 130px;
              animation: robot-arm-right 0.6s ease-in-out infinite;
            }
            
            .robot-head {
              transform-origin: 100px 70px;
              animation: robot-head 0.6s ease-in-out infinite;
            }
            
            .robot-leg-left {
              transform-origin: 80px 220px;
              animation: robot-leg-left 0.3s ease-in-out infinite;
            }
            
            .robot-leg-right {
              transform-origin: 120px 220px;
              animation: robot-leg-right 0.3s ease-in-out infinite;
            }
            
            .robot-eye {
              animation: robot-eye-glow 1s ease-in-out infinite;
            }
            
            .dancing-robot {
              display: inline-block;
              max-width: 100%;
              height: auto;
            }
            
            @media (min-width: 1024px) {
              .dancing-robot {
                max-width: 200px;
                width: 200px;
              }
            }
          `}
        </style>
      </defs>
      
      {/* Robot shadow */}
      <ellipse cx="100" cy="285" rx="40" ry="8" fill="rgba(0, 0, 0, 0.2)" className="robot-shadow"/>
      
      {/* Main robot group that bounces */}
      <g className="robot-body-group">
        {/* Legs */}
        <g className="robot-leg-left">
          <rect id="robot-left-leg" x="75" y="220" width="20" height="50" rx="5" fill="#4a5568"/>
          <rect id="robot-left-foot" x="70" y="265" width="30" height="15" rx="5" fill="#2d3748"/>
        </g>
        
        <g className="robot-leg-right">
          <rect id="robot-right-leg" x="105" y="220" width="20" height="50" rx="5" fill="#4a5568"/>
          <rect id="robot-right-foot" x="100" y="265" width="30" height="15" rx="5" fill="#2d3748"/>
        </g>
        
        {/* Torso */}
        <g className="robot-torso">
          <rect id="robot-torso" x="60" y="120" width="80" height="100" rx="10" fill="#4299e1"/>
          {/* Chest panel */}
          <rect id="robot-chest-panel" x="80" y="140" width="40" height="60" rx="5" fill="#2b6cb0"/>
          {/* Chest lights */}
          <circle id="robot-light-1" cx="90" cy="155" r="5" fill="#48bb78" className="robot-eye"/>
          <circle id="robot-light-2" cx="110" cy="155" r="5" fill="#f56565" className="robot-eye" style={{animationDelay: '0.3s'}}/>
          <rect id="robot-light-3" x="85" y="175" width="30" height="4" rx="2" fill="#ecc94b" className="robot-eye" style={{animationDelay: '0.6s'}}/>
        </g>
        
        {/* Arms */}
        <g className="robot-arm-left">
          <rect id="robot-left-upper-arm" x="30" y="125" width="30" height="20" rx="5" fill="#4a5568"/>
          <rect id="robot-left-lower-arm" x="25" y="145" width="20" height="40" rx="5" fill="#718096"/>
          <circle id="robot-left-hand" cx="35" cy="190" r="12" fill="#4a5568"/>
        </g>
        
        <g className="robot-arm-right">
          <rect id="robot-right-upper-arm" x="140" y="125" width="30" height="20" rx="5" fill="#4a5568"/>
          <rect id="robot-right-lower-arm" x="155" y="145" width="20" height="40" rx="5" fill="#718096"/>
          <circle id="robot-right-hand" cx="165" cy="190" r="12" fill="#4a5568"/>
        </g>
        
        {/* Head */}
        <g className="robot-head">
          {/* Neck */}
          <rect id="robot-neck" x="90" y="100" width="20" height="25" rx="3" fill="#4a5568"/>
          
          {/* Head main */}
          <rect id="robot-head-main" x="65" y="30" width="70" height="75" rx="15" fill="#4299e1"/>
          
          {/* Face plate */}
          <rect id="robot-face" x="75" y="45" width="50" height="45" rx="8" fill="#2b6cb0"/>
          
          {/* Eyes */}
          <circle id="robot-left-eye" cx="90" cy="60" r="8" fill="#48bb78" className="robot-eye"/>
          <circle id="robot-right-eye" cx="110" cy="60" r="8" fill="#48bb78" className="robot-eye" style={{animationDelay: '0.5s'}}/>
          
          {/* Eye pupils */}
          <circle id="robot-left-pupil" cx="92" cy="60" r="3" fill="#1a202c"/>
          <circle id="robot-right-pupil" cx="112" cy="60" r="3" fill="#1a202c"/>
          
          {/* Antenna */}
          <rect id="robot-antenna-stick" x="97" y="10" width="6" height="25" rx="2" fill="#4a5568"/>
          <circle id="robot-antenna-ball" cx="100" cy="10" r="8" fill="#f56565" className="robot-eye"/>
          
          {/* Mouth */}
          <rect id="robot-mouth" x="85" y="75" width="30" height="6" rx="3" fill="#1a202c"/>
        </g>
      </g>
    </svg>
  );
};

export default DancingRobot;
