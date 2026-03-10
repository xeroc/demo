var p=Object.defineProperty;var g=(t,e,n)=>e in t?p(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var a=(t,e,n)=>g(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();function x(t){return/^#[0-9A-Fa-f]{6}$/.test(t)||/^#[0-9A-Fa-f]{3}$/.test(t)}function b(t){return!Array.isArray(t)||t.length===0?!1:t.every(x)}function y(t){if(t.length===0)return[];if(t.length===1)return[`${t[0]} 0%`,`${t[0]} 100%`];const e=[],n=100/t.length;return t.forEach((o,i)=>{const r=Math.round(i*n);e.push(`${o} ${r}%`)}),e.push(`${t[0]} 100%`),e}function w(t){const{colors:e,angle:n=0}=t;if(!b(e))throw new Error("Invalid colors: must provide non-empty array of valid hex colors");const o=y(e);return`conic-gradient(from ${(n%360+360)%360}deg, ${o.join(", ")})`}const C={speed:100,maxX:1e3,maxY:1e3};function k(t,e,n,o,i){const r=e-t,s=Math.sqrt(2)/2,d=r/1e3*n*s,f=(d%o+o)%o,u=(d%i+i)%i;return{x:Math.round(f*1e3)/1e3,y:Math.round(u*1e3)/1e3}}class v{constructor(e=C){a(this,"startTime",null);a(this,"animationFrameId",null);a(this,"isRunning",!1);a(this,"config");a(this,"currentPosition",{x:0,y:0});a(this,"animate",()=>{if(!this.isRunning||this.startTime===null)return;const e=performance.now(),n=k(this.startTime,e,this.config.speed,this.config.maxX,this.config.maxY);this.currentPosition=n,this.config.onPositionUpdate&&this.config.onPositionUpdate(n.x,n.y),this.animationFrameId=requestAnimationFrame(this.animate)});this.config={...e}}start(){this.isRunning||(this.isRunning=!0,this.startTime=performance.now(),this.animate())}stop(){this.isRunning&&(this.isRunning=!1,this.animationFrameId!==null&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null))}reset(){this.stop(),this.startTime=null,this.currentPosition={x:0,y:0}}getState(){return{positionX:this.currentPosition.x,positionY:this.currentPosition.y,isRunning:this.isRunning,elapsedTime:this.startTime?performance.now()-this.startTime:0}}getPosition(){return{...this.currentPosition}}getIsRunning(){return this.isRunning}}const E={colors:["#667eea","#764ba2","#f093fb","#f5576c"],angle:0,speed:100,container:null};class A{constructor(e={}){a(this,"config");a(this,"animator",null);a(this,"container");a(this,"isMounted",!1);const n=Object.fromEntries(Object.entries(e).filter(([o,i])=>i!==void 0));this.config={...E,...n},this.container=this.config.container||document.body}mount(){this.isMounted||(this.isMounted=!0,this.animator=this.createAnimator(),this.animator.start())}unmount(){this.isMounted&&(this.animator!==null&&this.animator.stop(),this.animator=null,this.isMounted=!1,this.container.style.background="")}getIsMounted(){return this.isMounted}getAnimator(){return this.animator}getConfig(){return{...this.config}}updateConfig(e){const n=Object.fromEntries(Object.entries(e).filter(([o,i])=>i!==void 0));if(this.config={...this.config,...n},this.isMounted){const o=this.animator!==null&&this.animator.getIsRunning();this.animator!==null&&this.animator.stop(),this.animator=null,this.animator=this.createAnimator(),o&&this.animator!==null&&this.animator.start()}}createAnimator(){const e={speed:this.config.speed,maxX:2e3,maxY:2e3,onPositionUpdate:(n,o)=>this.updateGradient(n)};return new v(e)}updateGradient(e){const n=e/2e3*360,o=this.config.angle+n,i={colors:this.config.colors,angle:o};try{const r=w(i);this.container.style.background=r}catch(r){console.error("Failed to create gradient:",r)}}}const h={colors:["#667eea","#764ba2","#f093fb","#f5576c"],duration:3e3,angle:45};let l=null;function N(t=h){l!==null&&(l.unmount(),l=null);const e={colors:t.colors,angle:t.angle,speed:2e3/Math.max(t.duration,1)*100};l=new A(e),l.mount(),T()}function m(){if(l!==null)if(document.hidden){const t=l.getAnimator();t!==null&&t.getIsRunning()&&t.stop()}else{const t=l.getAnimator();t!==null&&!t.getIsRunning()&&t.start()}}function T(){document.removeEventListener("visibilitychange",m),document.addEventListener("visibilitychange",m)}function I(){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("id","dancing-robot"),t.setAttribute("viewBox","0 0 200 300"),t.setAttribute("class","dancing-robot"),t.setAttribute("role","img"),t.setAttribute("aria-label","Dancing robot animation"),t.innerHTML=`
    <defs>
      <style>
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
      </style>
    </defs>
    
    <!-- Robot shadow -->
    <ellipse cx="100" cy="285" rx="40" ry="8" fill="rgba(0, 0, 0, 0.2)" class="robot-shadow"/>
    
    <!-- Main robot group that bounces -->
    <g class="robot-body-group">
      <!-- Legs -->
      <g class="robot-leg-left">
        <rect id="robot-left-leg" x="75" y="220" width="20" height="50" rx="5" fill="#4a5568"/>
        <rect id="robot-left-foot" x="70" y="265" width="30" height="15" rx="5" fill="#2d3748"/>
      </g>
      
      <g class="robot-leg-right">
        <rect id="robot-right-leg" x="105" y="220" width="20" height="50" rx="5" fill="#4a5568"/>
        <rect id="robot-right-foot" x="100" y="265" width="30" height="15" rx="5" fill="#2d3748"/>
      </g>
      
      <!-- Torso -->
      <g class="robot-torso">
        <rect id="robot-torso" x="60" y="120" width="80" height="100" rx="10" fill="#4299e1"/>
        <!-- Chest panel -->
        <rect id="robot-chest-panel" x="80" y="140" width="40" height="60" rx="5" fill="#2b6cb0"/>
        <!-- Chest lights -->
        <circle id="robot-light-1" cx="90" cy="155" r="5" fill="#48bb78" class="robot-eye"/>
        <circle id="robot-light-2" cx="110" cy="155" r="5" fill="#f56565" class="robot-eye" style="animation-delay: 0.3s"/>
        <rect id="robot-light-3" x="85" y="175" width="30" height="4" rx="2" fill="#ecc94b" class="robot-eye" style="animation-delay: 0.6s"/>
      </g>
      
      <!-- Arms -->
      <g class="robot-arm-left">
        <rect id="robot-left-upper-arm" x="30" y="125" width="30" height="20" rx="5" fill="#4a5568"/>
        <rect id="robot-left-lower-arm" x="25" y="145" width="20" height="40" rx="5" fill="#718096"/>
        <circle id="robot-left-hand" cx="35" cy="190" r="12" fill="#4a5568"/>
      </g>
      
      <g class="robot-arm-right">
        <rect id="robot-right-upper-arm" x="140" y="125" width="30" height="20" rx="5" fill="#4a5568"/>
        <rect id="robot-right-lower-arm" x="155" y="145" width="20" height="40" rx="5" fill="#718096"/>
        <circle id="robot-right-hand" cx="165" cy="190" r="12" fill="#4a5568"/>
      </g>
      
      <!-- Head -->
      <g class="robot-head">
        <!-- Neck -->
        <rect id="robot-neck" x="90" y="100" width="20" height="25" rx="3" fill="#4a5568"/>
        
        <!-- Head main -->
        <rect id="robot-head-main" x="65" y="30" width="70" height="75" rx="15" fill="#4299e1"/>
        
        <!-- Face plate -->
        <rect id="robot-face" x="75" y="45" width="50" height="45" rx="8" fill="#2b6cb0"/>
        
        <!-- Eyes -->
        <circle id="robot-left-eye" cx="90" cy="60" r="8" fill="#48bb78" class="robot-eye"/>
        <circle id="robot-right-eye" cx="110" cy="60" r="8" fill="#48bb78" class="robot-eye" style="animation-delay: 0.5s"/>
        
        <!-- Eye pupils -->
        <circle id="robot-left-pupil" cx="92" cy="60" r="3" fill="#1a202c"/>
        <circle id="robot-right-pupil" cx="112" cy="60" r="3" fill="#1a202c"/>
        
        <!-- Antenna -->
        <rect id="robot-antenna-stick" x="97" y="10" width="6" height="25" rx="2" fill="#4a5568"/>
        <circle id="robot-antenna-ball" cx="100" cy="10" r="8" fill="#f56565" class="robot-eye"/>
        
        <!-- Mouth -->
        <rect id="robot-mouth" x="85" y="75" width="30" height="6" rx="3" fill="#1a202c"/>
      </g>
    </g>
  `,t}function F(t){const e=document.getElementById(t);if(!e)return console.warn(`Container with ID "${t}" not found`),null;const n=I();return e.appendChild(n),n}const R={message:"This site can be modified by anyone participating in chaoscraft.dev.",linkUrl:"https://app.chaoscraft.dev",linkText:"Click here to participate!"};function j(t={}){const e={...R,...t},n=document.createElement("div");n.id="chaoscraft-banner",n.className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white py-3 px-4 text-center w-full max-w-full overflow-hidden",n.setAttribute("role","banner"),n.setAttribute("aria-label","ChaosCraft participation announcement");const o=document.createElement("div");o.className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto";const i=document.createElement("span");i.className="text-sm sm:text-base font-medium",i.textContent=e.message;const r=document.createElement("a");return r.href=e.linkUrl,r.target="_blank",r.rel="noopener noreferrer",r.className="text-sm sm:text-base font-semibold underline hover:text-yellow-200 transition-colors duration-200 whitespace-nowrap",r.textContent=e.linkText,r.setAttribute("aria-label",`${e.linkText} (opens in a new tab)`),o.appendChild(i),o.appendChild(r),n.appendChild(o),n}function O(t,e={}){let n;n=document.body;const o=j(e);return n.insertBefore(o,n.firstChild),o}const L={logoText:"ChaosCraft",logoIcon:"🌌"};function P(t={}){const e={...L,...t},n=document.createElement("nav");n.id="chaoscraft-navbar",n.className="bg-slate-900/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50",n.setAttribute("role","banner"),n.setAttribute("aria-label","Site header");const o=document.createElement("div");o.className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";const i=document.createElement("div");i.className="flex items-center justify-center h-16";const r=document.createElement("a");r.href="/",r.className="flex-shrink-0 flex items-center gap-2 transition-transform duration-200 hover:scale-105";const s=document.createElement("span");s.className="text-2xl sm:text-3xl animate-pulse",s.textContent=e.logoIcon,s.setAttribute("aria-hidden","true");const c=document.createElement("span");return c.className="text-lg sm:text-xl md:text-2xl font-bold text-white",c.textContent=e.logoText,r.appendChild(s),r.appendChild(c),i.appendChild(r),o.appendChild(i),n.appendChild(o),n}function M(t,e={}){let n;n=document.body;const o=P(e),i=document.getElementById("chaoscraft-banner");return i&&i.nextSibling?n.insertBefore(o,i.nextSibling):i?n.appendChild(o):n.insertBefore(o,n.firstChild),o}const _={copyrightText:"© 2026 ChaosCraft. Built by chaos, one dollar at a time."};function B(t={}){const e={..._,...t},n=document.createElement("footer");n.id="chaoscraft-footer",n.className="bg-slate-900/95 backdrop-blur-md border-t border-white/10 mt-auto",n.setAttribute("role","contentinfo");const o=document.createElement("div");o.className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10";const i=document.createElement("div");i.className="flex flex-col items-center gap-4 sm:gap-6";const r=document.createElement("p");return r.className="text-xs sm:text-sm md:text-base text-gray-400 text-center",r.textContent=e.copyrightText,i.appendChild(r),o.appendChild(i),n.appendChild(o),n}function S(t,e={}){let n;n=document.body;const o=B(e);return n.appendChild(o),o}const D="https://jokeapi.swastikdan.in/api/jokes";async function U(){try{const t=await fetch(D);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);const e=await t.json();if(e.error)throw new Error(e.message||"API returned an error");if(e.joke)return e.joke;if(e.setup&&e.delivery)return`${e.setup} ${e.delivery}`;throw new Error("Invalid joke format received")}catch(t){throw console.error("Error fetching joke:",t),t}}function $(){const t=document.createElement("div");t.id="joke-container",t.className="mt-6 sm:mt-8 md:mt-8 w-full max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-8 bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/40 rounded-2xl backdrop-blur-sm border border-white/10 shadow-xl";const e=document.createElement("h3");e.className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 text-center",e.innerHTML="😄 Random Joke";const n=document.createElement("p");return n.id="joke-text",n.className="text-sm sm:text-base md:text-lg text-gray-100 text-center leading-relaxed",n.textContent="Loading joke...",t.appendChild(e),t.appendChild(n),t}async function z(){const t=document.getElementById("joke-text");if(!t){console.error("Joke text element not found");return}try{t.textContent="Loading joke...",t.className="text-sm sm:text-base md:text-lg text-gray-400 text-center leading-relaxed italic";const e=await U();t.textContent=e,t.className="text-sm sm:text-base md:text-lg text-gray-100 text-center leading-relaxed"}catch{t.textContent="Failed to load joke. Please try again later.",t.className="text-sm sm:text-base md:text-lg text-red-300 text-center leading-relaxed"}}function G(t){const e=document.getElementById(t);if(!e){console.error(`Container with ID "${t}" not found`);return}const n=$();e.appendChild(n),z()}const H=`
  /* Responsive Visibility Utilities */
  
  /* Hide on mobile (0-639px), show on tablet and up (640px+) */
  .hide-mobile {
    display: none;
  }
  
  @media (min-width: 640px) {
    .hide-mobile {
      display: block;
    }
  }
  
  /* Hide on tablet (640px-1023px), show on mobile and desktop */
  .hide-tablet {
    display: block;
  }
  
  @media (min-width: 640px) and (max-width: 1023px) {
    .hide-tablet {
      display: none;
    }
  }
  
  /* Hide on desktop (1024px+), show on mobile and tablet */
  .hide-desktop {
    display: block;
  }
  
  @media (min-width: 1024px) {
    .hide-desktop {
      display: none;
    }
  }
  
  /* Show only on mobile (0-639px) */
  .show-mobile-only {
    display: block;
  }
  
  @media (min-width: 640px) {
    .show-mobile-only {
      display: none;
    }
  }
  
  /* Show only on tablet (640px-1023px) */
  .show-tablet-only {
    display: none;
  }
  
  @media (min-width: 640px) and (max-width: 1023px) {
    .show-tablet-only {
      display: block;
    }
  }
  
  /* Show only on desktop (1024px+) */
  .show-desktop-only {
    display: none;
  }
  
  @media (min-width: 1024px) {
    .show-desktop-only {
      display: block;
    }
  }
  
  /* Inline variants */
  .hide-mobile-inline {
    display: none;
  }
  
  @media (min-width: 640px) {
    .hide-mobile-inline {
      display: inline;
    }
  }
  
  .hide-tablet-inline {
    display: inline;
  }
  
  @media (min-width: 640px) and (max-width: 1023px) {
    .hide-tablet-inline {
      display: none;
    }
  }
  
  .hide-desktop-inline {
    display: inline;
  }
  
  @media (min-width: 1024px) {
    .hide-desktop-inline {
      display: none;
    }
  }
  
  /* Flex variants */
  .hide-mobile-flex {
    display: none;
  }
  
  @media (min-width: 640px) {
    .hide-mobile-flex {
      display: flex;
    }
  }
  
  .hide-tablet-flex {
    display: flex;
  }
  
  @media (min-width: 640px) and (max-width: 1023px) {
    .hide-tablet-flex {
      display: none;
    }
  }
  
  .hide-desktop-flex {
    display: flex;
  }
  
  @media (min-width: 1024px) {
    .hide-desktop-flex {
      display: none;
    }
  }
  
  /* Touch target minimum size (44px x 44px) */
  .touch-target {
    min-width: 44px;
    min-height: 44px;
  }
  
  /* Prevent horizontal scroll */
  .prevent-overflow-x {
    overflow-x: hidden;
    max-width: 100vw;
  }
  
  /* Ensure proper box sizing */
  .box-border {
    box-sizing: border-box;
  }
  
  /* Minimum readable font size on mobile */
  @media (max-width: 639px) {
    .text-readable {
      font-size: max(16px, 1rem);
    }
  }
`;function J(){if(typeof document>"u"||document.getElementById("chaoscraft-responsive-utilities"))return;const e=document.createElement("style");e.id="chaoscraft-responsive-utilities",e.textContent=H,document.head.appendChild(e)}typeof document<"u"&&document.addEventListener("DOMContentLoaded",()=>{J(),M(),O(),N(h),F("robot-container"),G("joke-container-wrapper"),S()});
//# sourceMappingURL=main-CLIon_wP.js.map
