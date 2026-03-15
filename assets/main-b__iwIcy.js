var A=Object.defineProperty;var T=(t,n,e)=>n in t?A(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e;var l=(t,n,e)=>T(t,typeof n!="symbol"?n+"":n,e);(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=e(o);fetch(o.href,r)}})();function I(t){return/^#[0-9A-Fa-f]{6}$/.test(t)||/^#[0-9A-Fa-f]{3}$/.test(t)}function N(t){return!Array.isArray(t)||t.length===0?!1:t.every(I)}function F(t){if(t.length===0)return[];if(t.length===1)return[`${t[0]} 0%`,`${t[0]} 100%`];const n=[],e=100/t.length;return t.forEach((i,o)=>{const r=Math.round(o*e);n.push(`${i} ${r}%`)}),n.push(`${t[0]} 100%`),n}function M(t){const{colors:n,angle:e=0}=t;if(!N(n))throw new Error("Invalid colors: must provide non-empty array of valid hex colors");const i=F(n);return`conic-gradient(from ${(e%360+360)%360}deg, ${i.join(", ")})`}const O={speed:100,maxX:1e3,maxY:1e3};function j(t,n,e,i,o){const r=n-t,a=Math.sqrt(2)/2,u=r/1e3*e*a,v=(u%i+i)%i,E=(u%o+o)%o;return{x:Math.round(v*1e3)/1e3,y:Math.round(E*1e3)/1e3}}class L{constructor(n=O){l(this,"startTime",null);l(this,"animationFrameId",null);l(this,"isRunning",!1);l(this,"config");l(this,"currentPosition",{x:0,y:0});l(this,"animate",()=>{if(!this.isRunning||this.startTime===null)return;const n=performance.now(),e=j(this.startTime,n,this.config.speed,this.config.maxX,this.config.maxY);this.currentPosition=e,this.config.onPositionUpdate&&this.config.onPositionUpdate(e.x,e.y),this.animationFrameId=requestAnimationFrame(this.animate)});this.config={...n}}start(){this.isRunning||(this.isRunning=!0,this.startTime=performance.now(),this.animate())}stop(){this.isRunning&&(this.isRunning=!1,this.animationFrameId!==null&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null))}reset(){this.stop(),this.startTime=null,this.currentPosition={x:0,y:0}}getState(){return{positionX:this.currentPosition.x,positionY:this.currentPosition.y,isRunning:this.isRunning,elapsedTime:this.startTime?performance.now()-this.startTime:0}}getPosition(){return{...this.currentPosition}}getIsRunning(){return this.isRunning}}const R={colors:["#667eea","#764ba2","#f093fb","#f5576c"],angle:0,speed:100,container:null};class ${constructor(n={}){l(this,"config");l(this,"animator",null);l(this,"container");l(this,"isMounted",!1);const e=Object.fromEntries(Object.entries(n).filter(([i,o])=>o!==void 0));this.config={...R,...e},this.container=this.config.container||document.body}mount(){this.isMounted||(this.isMounted=!0,this.animator=this.createAnimator(),this.animator.start())}unmount(){this.isMounted&&(this.animator!==null&&this.animator.stop(),this.animator=null,this.isMounted=!1,this.container.style.background="")}getIsMounted(){return this.isMounted}getAnimator(){return this.animator}getConfig(){return{...this.config}}updateConfig(n){const e=Object.fromEntries(Object.entries(n).filter(([i,o])=>o!==void 0));if(this.config={...this.config,...e},this.isMounted){const i=this.animator!==null&&this.animator.getIsRunning();this.animator!==null&&this.animator.stop(),this.animator=null,this.animator=this.createAnimator(),i&&this.animator!==null&&this.animator.start()}}createAnimator(){const n={speed:this.config.speed,maxX:2e3,maxY:2e3,onPositionUpdate:(e,i)=>this.updateGradient(e)};return new L(n)}updateGradient(n){const e=n/2e3*360,i=this.config.angle+e,o={colors:this.config.colors,angle:i};try{const r=M(o);this.container.style.background=r}catch(r){console.error("Failed to create gradient:",r)}}}const y={colors:["#667eea","#764ba2","#f093fb","#f5576c"],duration:3e3,angle:45};let d=null;function _(t=y){d!==null&&(d.unmount(),d=null);const n={colors:t.colors,angle:t.angle,speed:2e3/Math.max(t.duration,1)*100};d=new $(n),d.mount(),B()}function b(){if(d!==null)if(document.hidden){const t=d.getAnimator();t!==null&&t.getIsRunning()&&t.stop()}else{const t=d.getAnimator();t!==null&&!t.getIsRunning()&&t.start()}}function B(){document.removeEventListener("visibilitychange",b),document.addEventListener("visibilitychange",b)}function S(){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("id","dancing-robot"),t.setAttribute("viewBox","0 0 200 300"),t.setAttribute("class","dancing-robot"),t.setAttribute("role","img"),t.setAttribute("aria-label","Dancing robot animation"),t.innerHTML=`
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
  `,t}function D(t){const n=document.getElementById(t);if(!n)return console.warn(`Container with ID "${t}" not found`),null;const e=S();return n.appendChild(e),e}const P={message:"This site can be modified by anyone participating in chaoscraft.dev.",linkUrl:"https://app.chaoscraft.dev",linkText:"Click here to participate!"};function U(t={}){const n={...P,...t},e=document.createElement("div");e.id="chaoscraft-banner",e.className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white py-3 px-4 text-center w-full max-w-full overflow-hidden",e.setAttribute("role","banner"),e.setAttribute("aria-label","ChaosCraft participation announcement");const i=document.createElement("div");i.className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto";const o=document.createElement("span");o.className="text-sm sm:text-base font-medium",o.textContent=n.message;const r=document.createElement("a");return r.href=n.linkUrl,r.target="_blank",r.rel="noopener noreferrer",r.className="text-sm sm:text-base font-semibold underline hover:text-yellow-200 transition-colors duration-200 whitespace-nowrap",r.textContent=n.linkText,r.setAttribute("aria-label",`${n.linkText} (opens in a new tab)`),i.appendChild(o),i.appendChild(r),e.appendChild(i),e}function z(t,n={}){let e;e=document.body;const i=U(n);return e.insertBefore(i,e.firstChild),i}const H={logoText:"ChaosCraft",logoIcon:"🌌"};function G(t={}){const n={...H,...t},e=document.createElement("nav");e.id="chaoscraft-navbar",e.className="bg-slate-900/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50",e.setAttribute("role","banner"),e.setAttribute("aria-label","Site header");const i=document.createElement("div");i.className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";const o=document.createElement("div");o.className="flex items-center justify-center h-16";const r=document.createElement("a");r.href="/",r.className="flex-shrink-0 flex items-center gap-2 transition-transform duration-200 hover:scale-105";const a=document.createElement("span");a.className="text-2xl sm:text-3xl animate-pulse",a.textContent=n.logoIcon,a.setAttribute("aria-hidden","true");const c=document.createElement("span");return c.className="text-lg sm:text-xl md:text-2xl font-bold text-white",c.textContent=n.logoText,r.appendChild(a),r.appendChild(c),o.appendChild(r),i.appendChild(o),e.appendChild(i),e}function Y(t,n={}){let e;e=document.body;const i=G(n),o=document.getElementById("chaoscraft-banner");return o&&o.nextSibling?e.insertBefore(i,o.nextSibling):o?e.appendChild(i):e.insertBefore(i,e.firstChild),i}const K={copyrightText:"© 2026 ChaosCraft. Built by chaos, one dollar at a time."};function J(t={}){const n={...K,...t},e=document.createElement("footer");e.id="chaoscraft-footer",e.className="bg-slate-900/95 backdrop-blur-md border-t border-white/10 mt-auto",e.setAttribute("role","contentinfo");const i=document.createElement("div");i.className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10";const o=document.createElement("div");o.className="flex flex-col items-center gap-4 sm:gap-6";const r=document.createElement("p");return r.className="text-xs sm:text-sm md:text-base text-gray-400 text-center",r.textContent=n.copyrightText,o.appendChild(r),i.appendChild(o),e.appendChild(i),e}function q(t,n={}){let e;e=document.body;const i=J(n);return e.appendChild(i),i}const V="https://jokeapi.swastikdan.in/api/jokes";async function X(){try{const t=await fetch(V);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);const n=await t.json();if(!n.success||!n.jokes||n.jokes.length===0)throw new Error("Invalid API response");const e=n.jokes[0];if(e.joke)return e.joke;if(e.setup&&e.punchline)return`${e.setup} ${e.punchline}`;throw new Error("Invalid joke format received")}catch(t){throw console.error("Error fetching joke:",t),t}}function W(){const t=document.createElement("div");t.id="joke-container",t.className="mt-6 sm:mt-8 md:mt-8 w-full max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-8 bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/40 rounded-2xl backdrop-blur-sm border border-white/10 shadow-xl";const n=document.createElement("h3");n.className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 text-center",n.innerHTML="😄 Random Joke";const e=document.createElement("p");return e.id="joke-text",e.className="text-sm sm:text-base md:text-lg text-gray-100 text-center leading-relaxed",e.textContent="Loading joke...",t.appendChild(n),t.appendChild(e),t}async function Q(){const t=document.getElementById("joke-text");if(!t){console.error("Joke text element not found");return}try{t.textContent="Loading joke...",t.className="text-sm sm:text-base md:text-lg text-gray-400 text-center leading-relaxed italic";const n=await X();t.textContent=n,t.className="text-sm sm:text-base md:text-lg text-gray-100 text-center leading-relaxed"}catch{t.textContent="Failed to load joke. Please try again later.",t.className="text-sm sm:text-base md:text-lg text-red-300 text-center leading-relaxed"}}function Z(t){const n=document.getElementById(t);if(!n){console.error(`Container with ID "${t}" not found`);return}const e=W();n.appendChild(e),Q()}const tt={title:"🌍 Participating Countries",countries:["United States","Germany","United Kingdom","Canada","Australia","Japan","France","Brazil","India","Netherlands"]};function et(t={}){const n={...tt,...t},e=document.createElement("section");e.id="countries-container",e.className="mt-6 sm:mt-8 md:mt-8 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-8 bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/40 rounded-2xl backdrop-blur-sm border border-white/10 shadow-xl";const i=document.createElement("h3");i.className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 text-center",i.textContent=n.title;const o=document.createElement("div");return o.className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4",n.countries.forEach(r=>{const a=document.createElement("span");a.className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 text-gray-200 rounded-full text-xs sm:text-sm md:text-base border border-white/20 transition-all duration-200 cursor-default",a.textContent=r,o.appendChild(a)}),e.appendChild(i),e.appendChild(o),e}function nt(t="countries-wrapper"){const n=document.getElementById(t);if(!n){console.error(`Container with ID "${t}" not found`);return}const e=et();n.appendChild(e)}const ot=`
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
`;function it(){if(typeof document>"u"||document.getElementById("chaoscraft-responsive-utilities"))return;const n=document.createElement("style");n.id="chaoscraft-responsive-utilities",n.textContent=ot,document.head.appendChild(n)}const rt={onActivate:()=>{},autoReset:!0,resetDelay:5e3},at=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","KeyB","KeyA"];let m=[],f=!1,s=null,g=null;function st(t,n,e){const i=document.createElement("div");return i.style.cssText=`
    position: fixed;
    left: ${t}px;
    top: ${n}px;
    width: 10px;
    height: 10px;
    background: ${e};
    border-radius: 50%;
    pointer-events: none;
    z-index: 10001;
    animation: particle-explode 1s ease-out forwards;
  `,i}function lt(t,n){const e=document.createElement("div");return e.innerHTML="✨",e.style.cssText=`
    position: fixed;
    left: ${t}px;
    top: ${n}px;
    font-size: 24px;
    pointer-events: none;
    z-index: 10001;
    animation: sparkle-float 1.5s ease-out forwards;
  `,e}function ct(){const t=document.createElement("div");t.id="konami-celebration-overlay",t.setAttribute("role","dialog"),t.setAttribute("aria-label","Chaos Master Achievement Unlocked"),t.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: overlay-fade-in 0.5s ease-out;
  `;const n=document.createElement("div");n.innerHTML=`
    <div style="
      width: 200px;
      height: 200px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 60px rgba(102, 126, 234, 0.8);
      animation: badge-pulse 1s ease-in-out infinite;
      margin-bottom: 40px;
    ">
      <div style="
        font-size: 80px;
        filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
      ">🏆</div>
    </div>
    <h1 style="
      font-size: 48px;
      font-weight: bold;
      background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 20px;
      text-align: center;
      animation: title-bounce 0.5s ease-out;
    ">Chaos Master</h1>
    <p style="
      font-size: 32px;
      color: #fff;
      text-align: center;
      margin-bottom: 30px;
      animation: message-fade-in 0.5s ease-out 0.3s both;
    ">🎉 You found the chaos! 🎉</p>
    <p style="
      font-size: 18px;
      color: #a0aec0;
      text-align: center;
      animation: message-fade-in 0.5s ease-out 0.5s both;
    ">Press ESC or click anywhere to close</p>
  `,n.style.cssText=`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
  `,t.appendChild(n);const e=["#667eea","#764ba2","#f093fb","#f5576c","#ffd700","#00ff87"];for(let o=0;o<50;o++)setTimeout(()=>{const r=Math.random()*window.innerWidth,a=Math.random()*window.innerHeight,c=e[Math.floor(Math.random()*e.length)],u=st(r,a,c);t.appendChild(u),setTimeout(()=>u.remove(),1e3)},o*50);for(let o=0;o<30;o++)setTimeout(()=>{const r=Math.random()*window.innerWidth,a=Math.random()*window.innerHeight,c=lt(r,a);t.appendChild(c),setTimeout(()=>c.remove(),1500)},o*100);const i=document.createElement("style");return i.id="konami-animations",i.textContent=`
    @keyframes overlay-fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
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
    
    @keyframes title-bounce {
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
    
    @keyframes message-fade-in {
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
  `,document.head.appendChild(i),t}function dt(t,n){m.push(t.code),m.length>10&&m.shift(),m.length===10&&!f&&m.every((i,o)=>i===at[o])&&mt(n),t.key==="Escape"&&f&&w()}function mt(t){if(f)return;f=!0,s=ct(),document.body.appendChild(s);const n=()=>{w(),s==null||s.removeEventListener("click",n)};s.addEventListener("click",n),t.onActivate(),t.autoReset&&setTimeout(()=>{m=[]},t.resetDelay),console.log("🎮 Konami Code activated! You found the chaos!")}function w(){if(!f)return;f=!1,s&&(s.style.animation="overlay-fade-in 0.3s ease-out reverse",setTimeout(()=>{s==null||s.remove(),s=null},300));const t=document.getElementById("konami-animations");t&&t.remove()}function ft(t={}){const n={...rt,...t};ut(),g=e=>dt(e,n),document.addEventListener("keydown",g),console.log("🎮 Konami Code listener mounted. Try: ↑↑↓↓←→←→BA")}function ut(){g&&(document.removeEventListener("keydown",g),g=null),m=[],f=!1,s&&(s.remove(),s=null);const t=document.getElementById("konami-animations");t&&t.remove()}const x={direction:"up",delay:0,duration:600,distance:30,easing:"cubic-bezier(0.4, 0, 0.2, 1)",threshold:.1,rootMargin:"0px 0px -50px 0px"};function C(){return typeof window>"u"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches}function k(t,n){switch(t){case"up":return`translateY(${n}px)`;case"down":return`translateY(-${n}px)`;case"left":return`translateX(${n}px)`;case"right":return`translateX(-${n}px)`;case"none":return"none";default:return`translateY(${n}px)`}}function pt(t,n={}){const e={...x,...n};if(C()){t.style.opacity="1",t.style.transform="none";return}t.style.opacity="0",t.style.transform=k(e.direction,e.distance),t.style.transition=`opacity ${e.duration}ms ${e.easing} ${e.delay}ms, transform ${e.duration}ms ${e.easing} ${e.delay}ms`,requestAnimationFrame(()=>{requestAnimationFrame(()=>{t.style.opacity="1",t.style.transform="none"})})}let p=null;function ht(){return p||(p=new IntersectionObserver(t=>{t.forEach(n=>{if(n.isIntersecting){const e=n.target,i=e.__entranceConfig;i&&pt(e,i),p.unobserve(e)}})},{threshold:x.threshold,rootMargin:x.rootMargin}),p)}function h(t,n={}){const e={...x,...n};if(C()){t.style.opacity="1",t.style.transform="none";return}t.style.opacity="0",t.style.transform=k(e.direction,e.distance),t.__entranceConfig=e,ht().observe(t)}function gt(){const t=document.getElementById("chaoscraft-banner");t&&h(t,{direction:"down",delay:0,duration:500});const n=document.getElementById("robot-container");n&&h(n,{direction:"up",delay:100,duration:600});const e=document.getElementById("joke-container");e&&h(e,{direction:"up",delay:200,duration:600});const i=document.getElementById("countries-container");i&&h(i,{direction:"up",delay:300,duration:600});const o=document.getElementById("chaoscraft-footer");o&&h(o,{direction:"up",delay:400,duration:500})}typeof document<"u"&&document.addEventListener("DOMContentLoaded",()=>{it(),Y(),z(),_(y),D("robot-container"),Z("joke-container-wrapper"),nt("countries-wrapper"),q(),ft(),requestAnimationFrame(()=>{gt()})});
//# sourceMappingURL=main-b__iwIcy.js.map
