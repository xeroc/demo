var w=Object.defineProperty;var v=(e,t,n)=>t in e?w(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var h=(e,t,n)=>v(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();function C(e){return/^#[0-9A-Fa-f]{6}$/.test(e)||/^#[0-9A-Fa-f]{3}$/.test(e)}function A(e){return!Array.isArray(e)||e.length===0?!1:e.every(C)}function E(e){if(e.length===0)return[];if(e.length===1)return[`${e[0]} 0%`,`${e[0]} 100%`];const t=[],n=100/e.length;return e.forEach((o,i)=>{const a=Math.round(i*n);t.push(`${o} ${a}%`)}),t.push(`${e[0]} 100%`),t}function k(e){const{colors:t,angle:n=0}=e;if(!A(t))throw new Error("Invalid colors: must provide non-empty array of valid hex colors");const o=E(t);return`conic-gradient(from ${(n%360+360)%360}deg, ${o.join(", ")})`}const N={speed:100,maxX:1e3,maxY:1e3};function I(e,t,n,o,i){const a=t-e,d=Math.sqrt(2)/2,c=a/1e3*n*d,r=(c%o+o)%o,s=(c%i+i)%i;return{x:Math.round(r*1e3)/1e3,y:Math.round(s*1e3)/1e3}}class T{constructor(t=N){h(this,"startTime",null);h(this,"animationFrameId",null);h(this,"isRunning",!1);h(this,"config");h(this,"currentPosition",{x:0,y:0});h(this,"animate",()=>{if(!this.isRunning||this.startTime===null)return;const t=performance.now(),n=I(this.startTime,t,this.config.speed,this.config.maxX,this.config.maxY);this.currentPosition=n,this.config.onPositionUpdate&&this.config.onPositionUpdate(n.x,n.y),this.animationFrameId=requestAnimationFrame(this.animate)});this.config={...t}}start(){this.isRunning||(this.isRunning=!0,this.startTime=performance.now(),this.animate())}stop(){this.isRunning&&(this.isRunning=!1,this.animationFrameId!==null&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null))}reset(){this.stop(),this.startTime=null,this.currentPosition={x:0,y:0}}getState(){return{positionX:this.currentPosition.x,positionY:this.currentPosition.y,isRunning:this.isRunning,elapsedTime:this.startTime?performance.now()-this.startTime:0}}getPosition(){return{...this.currentPosition}}getIsRunning(){return this.isRunning}}const L={colors:["#667eea","#764ba2","#f093fb","#f5576c"],angle:0,speed:100,container:null};class F{constructor(t={}){h(this,"config");h(this,"animator",null);h(this,"container");h(this,"isMounted",!1);const n=Object.fromEntries(Object.entries(t).filter(([o,i])=>i!==void 0));this.config={...L,...n},this.container=this.config.container||document.body}mount(){this.isMounted||(this.isMounted=!0,this.animator=this.createAnimator(),this.animator.start())}unmount(){this.isMounted&&(this.animator!==null&&this.animator.stop(),this.animator=null,this.isMounted=!1,this.container.style.background="")}getIsMounted(){return this.isMounted}getAnimator(){return this.animator}getConfig(){return{...this.config}}updateConfig(t){const n=Object.fromEntries(Object.entries(t).filter(([o,i])=>i!==void 0));if(this.config={...this.config,...n},this.isMounted){const o=this.animator!==null&&this.animator.getIsRunning();this.animator!==null&&this.animator.stop(),this.animator=null,this.animator=this.createAnimator(),o&&this.animator!==null&&this.animator.start()}}createAnimator(){const t={speed:this.config.speed,maxX:2e3,maxY:2e3,onPositionUpdate:(n,o)=>this.updateGradient(n)};return new T(t)}updateGradient(t){const n=t/2e3*360,o=this.config.angle+n,i={colors:this.config.colors,angle:o};try{const a=k(i);this.container.style.background=a}catch(a){console.error("Failed to create gradient:",a)}}}const y={colors:["#667eea","#764ba2","#f093fb","#f5576c"],duration:3e3,angle:45};let p=null;function M(e=y){p!==null&&(p.unmount(),p=null);const t={colors:e.colors,angle:e.angle,speed:2e3/Math.max(e.duration,1)*100};p=new F(t),p.mount(),O()}function x(){if(p!==null)if(document.hidden){const e=p.getAnimator();e!==null&&e.getIsRunning()&&e.stop()}else{const e=p.getAnimator();e!==null&&!e.getIsRunning()&&e.start()}}function O(){document.removeEventListener("visibilitychange",x),document.addEventListener("visibilitychange",x)}function R(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("id","dancing-robot"),e.setAttribute("viewBox","0 0 200 300"),e.setAttribute("class","dancing-robot"),e.setAttribute("role","img"),e.setAttribute("aria-label","Dancing robot animation"),e.innerHTML=`
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
  `,e}function P(e){const t=document.getElementById(e);if(!t)return console.warn(`Container with ID "${e}" not found`),null;const n=R();return t.appendChild(n),n}const B={message:"This site can be modified by anyone participating in chaoscraft.dev.",linkUrl:"https://app.chaoscraft.dev",linkText:"Click here to participate!"};function S(e={}){const t={...B,...e},n=document.createElement("div");n.id="chaoscraft-banner",n.className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white py-3 px-4 text-center",n.setAttribute("role","banner"),n.setAttribute("aria-label","ChaosCraft participation announcement");const o=document.createElement("div");o.className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto";const i=document.createElement("span");i.className="text-sm sm:text-base font-medium",i.textContent=t.message;const a=document.createElement("a");return a.href=t.linkUrl,a.target="_blank",a.rel="noopener noreferrer",a.className="text-sm sm:text-base font-semibold underline hover:text-yellow-200 transition-colors duration-200",a.textContent=t.linkText,a.setAttribute("aria-label",`${t.linkText} (opens in a new tab)`),o.appendChild(i),o.appendChild(a),n.appendChild(o),n}function _(e,t={}){let n;n=document.body;const o=S(t);return n.insertBefore(o,n.firstChild),o}const D={logoText:"ChaosCraft",navItems:[{label:"Home",href:"/",isActive:!0},{label:"Contact",href:"/contact.html",isActive:!1}]};function H(e={}){const t={...D,...e},n=document.createElement("header");n.id="chaoscraft-header",n.className="bg-slate-900/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50",n.setAttribute("role","banner");const o=document.createElement("div");o.className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";const i=document.createElement("div");i.className="flex items-center justify-between h-16";const a=document.createElement("a");a.href="/",a.className="flex-shrink-0 flex items-center gap-2";const d=document.createElement("span");d.className="text-2xl",d.textContent="🌌",d.setAttribute("aria-hidden","true");const f=document.createElement("span");f.className="text-lg sm:text-xl font-bold text-white",f.textContent=t.logoText,a.appendChild(d),a.appendChild(f);const c=document.createElement("nav");c.className="hidden md:flex items-center gap-1",c.setAttribute("role","navigation"),c.setAttribute("aria-label","Main navigation"),t.navItems.forEach(l=>{const m=document.createElement("a");m.href=l.href,m.className=`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${l.isActive?"bg-cyan-500/20 text-cyan-300":"text-gray-300 hover:bg-white/10 hover:text-white"}`,m.textContent=l.label,l.isActive&&m.setAttribute("aria-current","page"),c.appendChild(m)});const r=document.createElement("button");r.type="button",r.className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-200",r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls","mobile-menu"),r.setAttribute("aria-label","Open main menu");const s=document.createElement("span");s.className="hamburger-icon",s.innerHTML=`
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path class="block" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
    </svg>
  `;const g=document.createElement("span");g.className="close-icon hidden",g.innerHTML=`
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
    </svg>
  `,r.appendChild(s),r.appendChild(g);const u=document.createElement("div");u.id="mobile-menu",u.className="mobile-menu hidden md:hidden",u.setAttribute("role","navigation"),u.setAttribute("aria-label","Mobile navigation");const b=document.createElement("nav");return b.className="px-2 pt-2 pb-3 space-y-1 bg-slate-800/95 rounded-b-lg",t.navItems.forEach(l=>{const m=document.createElement("a");m.href=l.href,m.className=`block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${l.isActive?"bg-cyan-500/20 text-cyan-300":"text-gray-300 hover:bg-white/10 hover:text-white"}`,m.textContent=l.label,l.isActive&&m.setAttribute("aria-current","page"),b.appendChild(m)}),u.appendChild(b),i.appendChild(a),i.appendChild(c),i.appendChild(r),o.appendChild(i),o.appendChild(u),n.appendChild(o),r.addEventListener("click",()=>{const l=r.getAttribute("aria-expanded")==="true";r.setAttribute("aria-expanded",String(!l)),l?(u.classList.add("hidden"),s.classList.remove("hidden"),g.classList.add("hidden"),r.setAttribute("aria-label","Open main menu")):(u.classList.remove("hidden"),s.classList.add("hidden"),g.classList.remove("hidden"),r.setAttribute("aria-label","Close main menu"))}),document.addEventListener("keydown",l=>{l.key==="Escape"&&!u.classList.contains("hidden")&&(u.classList.add("hidden"),s.classList.remove("hidden"),g.classList.add("hidden"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-label","Open main menu"),r.focus())}),n}function U(e,t={}){let n;n=document.body;const o=H(t),i=document.getElementById("chaoscraft-banner");return i&&i.nextSibling?n.insertBefore(o,i.nextSibling):i?n.appendChild(o):n.insertBefore(o,n.firstChild),o}const $={copyrightText:"© 2024 ChaosCraft. Built by chaos, one dollar at a time.",links:[{label:"Home",href:"/"},{label:"Contact",href:"/contact.html"},{label:"Participate",href:"https://app.chaoscraft.dev",external:!0}]};function j(e={}){const t={...$,...e},n=document.createElement("footer");n.id="chaoscraft-footer",n.className="bg-slate-900/95 backdrop-blur-md border-t border-white/10 mt-auto",n.setAttribute("role","contentinfo");const o=document.createElement("div");o.className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10";const i=document.createElement("div");i.className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8";const a=document.createElement("nav");a.className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 md:gap-8",a.setAttribute("aria-label","Footer navigation"),t.links.forEach(r=>{const s=document.createElement("a");s.href=r.href,r.external&&(s.target="_blank",s.rel="noopener noreferrer",s.setAttribute("aria-label",`${r.label} (opens in a new tab)`)),s.className="text-sm sm:text-base text-gray-300 hover:text-white hover:text-cyan-300 transition-colors duration-200 font-medium",s.textContent=r.label,a.appendChild(s)});const d=document.createElement("div");d.className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/20 to-transparent";const f=document.createElement("p");f.className="text-xs sm:text-sm text-gray-400 text-center",f.textContent=t.copyrightText;const c=document.createElement("span");return c.className="text-2xl sm:text-3xl animate-pulse",c.textContent="🌌",c.setAttribute("aria-hidden","true"),i.appendChild(a),i.appendChild(d),i.appendChild(f),i.appendChild(c),o.appendChild(i),n.appendChild(o),n}function z(e,t={}){let n;n=document.body;const o=j(t);return n.appendChild(o),o}const G=`
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
`;function Y(){if(typeof document>"u"||document.getElementById("chaoscraft-responsive-utilities"))return;const t=document.createElement("style");t.id="chaoscraft-responsive-utilities",t.textContent=G,document.head.appendChild(t)}typeof document<"u"&&document.addEventListener("DOMContentLoaded",()=>{Y(),_(),U(),M(y),P("robot-container"),z()});
//# sourceMappingURL=main-N2PBQjE3.js.map
