var x=Object.defineProperty;var b=(e,n,t)=>n in e?x(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;var c=(e,n,t)=>b(e,typeof n!="symbol"?n+"":n,t);(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();function y(e){return/^#[0-9A-Fa-f]{6}$/.test(e)||/^#[0-9A-Fa-f]{3}$/.test(e)}function w(e){return!Array.isArray(e)||e.length===0?!1:e.every(y)}function C(e){if(e.length===0)return[];if(e.length===1)return[`${e[0]} 0%`,`${e[0]} 100%`];const n=[],t=100/e.length;return e.forEach((o,i)=>{const r=Math.round(i*t);n.push(`${o} ${r}%`)}),n.push(`${e[0]} 100%`),n}function v(e){const{colors:n,angle:t=0}=e;if(!w(n))throw new Error("Invalid colors: must provide non-empty array of valid hex colors");const o=C(n);return`conic-gradient(from ${(t%360+360)%360}deg, ${o.join(", ")})`}const E={speed:100,maxX:1e3,maxY:1e3};function A(e,n,t,o,i){const r=n-e,a=Math.sqrt(2)/2,l=r/1e3*t*a,h=(l%o+o)%o,g=(l%i+i)%i;return{x:Math.round(h*1e3)/1e3,y:Math.round(g*1e3)/1e3}}class k{constructor(n=E){c(this,"startTime",null);c(this,"animationFrameId",null);c(this,"isRunning",!1);c(this,"config");c(this,"currentPosition",{x:0,y:0});c(this,"animate",()=>{if(!this.isRunning||this.startTime===null)return;const n=performance.now(),t=A(this.startTime,n,this.config.speed,this.config.maxX,this.config.maxY);this.currentPosition=t,this.config.onPositionUpdate&&this.config.onPositionUpdate(t.x,t.y),this.animationFrameId=requestAnimationFrame(this.animate)});this.config={...n}}start(){this.isRunning||(this.isRunning=!0,this.startTime=performance.now(),this.animate())}stop(){this.isRunning&&(this.isRunning=!1,this.animationFrameId!==null&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null))}reset(){this.stop(),this.startTime=null,this.currentPosition={x:0,y:0}}getState(){return{positionX:this.currentPosition.x,positionY:this.currentPosition.y,isRunning:this.isRunning,elapsedTime:this.startTime?performance.now()-this.startTime:0}}getPosition(){return{...this.currentPosition}}getIsRunning(){return this.isRunning}}const N={colors:["#667eea","#764ba2","#f093fb","#f5576c"],angle:0,speed:100,container:null};class T{constructor(n={}){c(this,"config");c(this,"animator",null);c(this,"container");c(this,"isMounted",!1);const t=Object.fromEntries(Object.entries(n).filter(([o,i])=>i!==void 0));this.config={...N,...t},this.container=this.config.container||document.body}mount(){this.isMounted||(this.isMounted=!0,this.animator=this.createAnimator(),this.animator.start())}unmount(){this.isMounted&&(this.animator!==null&&this.animator.stop(),this.animator=null,this.isMounted=!1,this.container.style.background="")}getIsMounted(){return this.isMounted}getAnimator(){return this.animator}getConfig(){return{...this.config}}updateConfig(n){const t=Object.fromEntries(Object.entries(n).filter(([o,i])=>i!==void 0));if(this.config={...this.config,...t},this.isMounted){const o=this.animator!==null&&this.animator.getIsRunning();this.animator!==null&&this.animator.stop(),this.animator=null,this.animator=this.createAnimator(),o&&this.animator!==null&&this.animator.start()}}createAnimator(){const n={speed:this.config.speed,maxX:2e3,maxY:2e3,onPositionUpdate:(t,o)=>this.updateGradient(t)};return new k(n)}updateGradient(n){const t=n/2e3*360,o=this.config.angle+t,i={colors:this.config.colors,angle:o};try{const r=v(i);this.container.style.background=r}catch(r){console.error("Failed to create gradient:",r)}}}const u={colors:["#667eea","#764ba2","#f093fb","#f5576c"],duration:3e3,angle:45};let d=null;function H(e=u){d!==null&&(d.unmount(),d=null);const n={colors:e.colors,angle:e.angle,speed:2e3/Math.max(e.duration,1)*100};d=new T(n),d.mount(),M()}function p(){if(d!==null)if(document.hidden){const e=d.getAnimator();e!==null&&e.getIsRunning()&&e.stop()}else{const e=d.getAnimator();e!==null&&!e.getIsRunning()&&e.start()}}function M(){document.removeEventListener("visibilitychange",p),document.addEventListener("visibilitychange",p)}function I(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("id","dancing-robot"),e.setAttribute("viewBox","0 0 200 300"),e.setAttribute("class","dancing-robot"),e.setAttribute("role","img"),e.setAttribute("aria-label","Dancing robot animation"),e.innerHTML=`
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
  `,e}function L(e){const n=document.getElementById(e);if(!n)return console.warn(`Container with ID "${e}" not found`),null;const t=I();return n.appendChild(t),t}const F={message:"This site can be modified by anyone participating in chaoscraft.dev.",linkUrl:"https://app.chaoscraft.dev",linkText:"Click here to participate!"};function O(e={}){const n={...F,...e},t=document.createElement("div");t.id="chaoscraft-banner",t.className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white py-3 px-4 text-center w-full max-w-full overflow-hidden",t.setAttribute("role","banner"),t.setAttribute("aria-label","ChaosCraft participation announcement");const o=document.createElement("div");o.className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto";const i=document.createElement("span");i.className="text-sm sm:text-base font-medium",i.textContent=n.message;const r=document.createElement("a");return r.href=n.linkUrl,r.target="_blank",r.rel="noopener noreferrer",r.className="text-sm sm:text-base font-semibold underline hover:text-yellow-200 transition-colors duration-200 whitespace-nowrap",r.textContent=n.linkText,r.setAttribute("aria-label",`${n.linkText} (opens in a new tab)`),o.appendChild(i),o.appendChild(r),t.appendChild(o),t}function S(e,n={}){let t;t=document.body;const o=O(n);return t.insertBefore(o,t.firstChild),o}const R={logoText:"ChaosCraft",logoIcon:"🌌"};function _(e={}){const n={...R,...e},t=document.createElement("nav");t.id="chaoscraft-navbar",t.className="bg-slate-900/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50",t.setAttribute("role","banner"),t.setAttribute("aria-label","Site header");const o=document.createElement("div");o.className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";const i=document.createElement("div");i.className="flex items-center justify-center h-16";const r=document.createElement("a");r.href="/",r.className="flex-shrink-0 flex items-center gap-2 transition-transform duration-200 hover:scale-105";const a=document.createElement("span");a.className="text-2xl sm:text-3xl animate-pulse",a.textContent=n.logoIcon,a.setAttribute("aria-hidden","true");const s=document.createElement("span");return s.className="text-lg sm:text-xl md:text-2xl font-bold text-white",s.textContent=n.logoText,r.appendChild(a),r.appendChild(s),i.appendChild(r),o.appendChild(i),t.appendChild(o),t}function P(e,n={}){let t;t=document.body;const o=_(n),i=document.getElementById("chaoscraft-banner");return i&&i.nextSibling?t.insertBefore(o,i.nextSibling):i?t.appendChild(o):t.insertBefore(o,t.firstChild),o}const B={copyrightText:"© 2026 ChaosCraft. Built by chaos, one dollar at a time."};function z(e={}){const n={...B,...e},t=document.createElement("footer");t.id="chaoscraft-footer",t.className="bg-slate-900/95 backdrop-blur-md border-t border-white/10 mt-auto",t.setAttribute("role","contentinfo");const o=document.createElement("div");o.className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10";const i=document.createElement("div");i.className="flex flex-col items-center gap-4 sm:gap-6";const r=document.createElement("p");return r.className="text-xs sm:text-sm md:text-base text-gray-400 text-center",r.textContent=n.copyrightText,i.appendChild(r),o.appendChild(i),t.appendChild(o),t}function D(e,n={}){let t;t=document.body;const o=z(n);return t.appendChild(o),o}const U=`
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
`;function $(){if(typeof document>"u"||document.getElementById("chaoscraft-responsive-utilities"))return;const n=document.createElement("style");n.id="chaoscraft-responsive-utilities",n.textContent=U,document.head.appendChild(n)}const G={placeholder:"Type a command...",maxHeight:"400px",minHeight:"120px",maxMobileHeight:"33dvh",collapsedHeight:"48px"};let m=!1;function V(e={}){const n={...G,...e},t=document.createElement("div");t.id="chaoscraft-console",t.className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-cyan-400/30 z-50",t.setAttribute("role","log"),t.setAttribute("aria-label","Console terminal"),K(t,n);const o=q();t.appendChild(o);const i=document.createElement("div");i.id="console-output",i.className="console-output overflow-y-auto px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-mono text-green-400",i.style.cssText=`
    max-height: 100px;
    min-height: 40px;
  `,i.textContent="> Welcome to ChaosCraft Console v1.0";const r=document.createElement("div");r.className="console-input-wrapper flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border-t border-white/10";const a=document.createElement("span");a.className="text-cyan-400 font-mono text-xs sm:text-sm",a.textContent=">";const s=document.createElement("input");return s.type="text",s.id="console-input",s.className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm outline-none placeholder-gray-500",s.placeholder=n.placeholder,s.setAttribute("aria-label","Console command input"),r.appendChild(a),r.appendChild(s),t.appendChild(i),t.appendChild(r),j(t,o,n),Y(t,s,n),m&&f(t,n),t}function q(){const e=document.createElement("div");e.className="console-mobile-header flex items-center justify-between px-3 py-2 border-b border-white/10 md:hidden cursor-pointer select-none",e.style.cssText=`
    display: flex;
    min-height: 48px;
  `;const n=document.createElement("div");n.className="flex items-center gap-2";const t=document.createElement("span");t.className="text-cyan-400",t.textContent="💻",t.setAttribute("aria-hidden","true");const o=document.createElement("span");o.className="text-white font-mono text-xs font-semibold",o.textContent="Console",n.appendChild(t),n.appendChild(o);const i=document.createElement("button");i.id="console-toggle",i.className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 flex items-center gap-1",i.setAttribute("aria-label","Toggle console"),i.setAttribute("aria-expanded","true");const r=document.createElement("span");r.className="toggle-icon text-lg transition-transform duration-300",r.textContent="▼",r.setAttribute("aria-hidden","true");const a=document.createElement("span");return a.className="text-xs",a.textContent="Collapse",i.appendChild(r),i.appendChild(a),e.appendChild(n),e.appendChild(i),e}function j(e,n,t){const o=n.querySelector("#console-toggle"),i=e.querySelector("#console-output"),r=e.querySelector(".console-input-wrapper"),a=()=>{if(m=!m,m){f(e,t);const s=o.querySelector(".toggle-icon"),l=o.querySelector(".toggle-icon + span");s&&(s.textContent="▲"),l&&(l.textContent="Expand"),o.setAttribute("aria-expanded","false"),i&&(i.style.display="none"),r&&(r.style.display="none")}else{W(e,t);const s=o.querySelector(".toggle-icon"),l=o.querySelector(".toggle-icon + span");s&&(s.textContent="▼"),l&&(l.textContent="Collapse"),o.setAttribute("aria-expanded","true"),i&&(i.style.display="block"),r&&(r.style.display="flex")}};n.addEventListener("click",a),n.addEventListener("keydown",s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),a())}),n.setAttribute("tabindex","0"),n.setAttribute("role","button"),n.setAttribute("aria-label","Toggle console visibility")}function f(e,n){e.style.maxHeight=n.collapsedHeight,e.style.overflow="hidden"}function W(e,n){window.innerWidth<768?e.style.maxHeight=n.maxMobileHeight:e.style.maxHeight=n.maxHeight,e.style.overflow="visible"}function K(e,n){window.innerWidth<768?e.style.cssText=`
      max-height: ${n.maxMobileHeight};
      transition: max-height 0.3s ease-out;
    `:e.style.cssText=`
      max-height: ${n.maxHeight};
      min-height: ${n.minHeight};
    `}function Y(e,n,t){if("visualViewport"in window&&window.visualViewport){const o=window.visualViewport,i=()=>{if(!(window.innerWidth<768)||m)return;const a=o.height,l=window.innerHeight-a;if(l>100){const h=a*.25;e.style.maxHeight=`${Math.max(h,100)}px`,e.style.setProperty("--keyboard-height",`${l}px`)}else e.style.maxHeight=t.maxMobileHeight,e.style.removeProperty("--keyboard-height")};o.addEventListener("resize",i),o.addEventListener("scroll",i),i(),e._cleanupKeyboard=()=>{o.removeEventListener("resize",i),o.removeEventListener("scroll",i)}}else{const o=()=>{if(!(window.innerWidth<768)){e.style.maxHeight=t.maxHeight;return}if(m)return;window.innerHeight<window.screen.height*.75?e.style.maxHeight="25vh":e.style.maxHeight=t.maxMobileHeight};window.addEventListener("resize",o),e._cleanupKeyboard=()=>{window.removeEventListener("resize",o)}}n.addEventListener("focus",()=>{window.innerWidth<768&&!m&&setTimeout(()=>{e.scrollIntoView({behavior:"smooth",block:"end"})},300)})}function X(e,n={}){let t;t=document.body;const o=V(n);return t.appendChild(o),o}typeof document<"u"&&document.addEventListener("DOMContentLoaded",()=>{$(),P(),S(),H(u),L("robot-container"),X(),D()});
//# sourceMappingURL=main-BOr_gcC_.js.map
