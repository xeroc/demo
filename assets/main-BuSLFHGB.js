var g=Object.defineProperty;var m=(t,e,i)=>e in t?g(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var a=(t,e,i)=>m(t,typeof e!="symbol"?e+"":e,i);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function i(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=i(n);fetch(n.href,o)}})();function b(t){return/^#[0-9A-Fa-f]{6}$/.test(t)||/^#[0-9A-Fa-f]{3}$/.test(t)}function p(t){return!Array.isArray(t)||t.length===0?!1:t.every(b)}function y(t){if(t.length===0)return[];if(t.length===1)return[`${t[0]} 0%`,`${t[0]} 100%`];const e=[],i=100/t.length;return t.forEach((r,n)=>{const o=Math.round(n*i);e.push(`${r} ${o}%`)}),e.push(`${t[0]} 100%`),e}function x(t){const{colors:e,angle:i=0}=t;if(!p(e))throw new Error("Invalid colors: must provide non-empty array of valid hex colors");const r=y(e);return`conic-gradient(from ${(i%360+360)%360}deg, ${r.join(", ")})`}const w={speed:100,maxX:1e3,maxY:1e3};function A(t,e,i,r,n){const o=e-t,l=Math.sqrt(2)/2,c=o/1e3*i*l,u=(c%r+r)%r,h=(c%n+n)%n;return{x:Math.round(u*1e3)/1e3,y:Math.round(h*1e3)/1e3}}class C{constructor(e=w){a(this,"startTime",null);a(this,"animationFrameId",null);a(this,"isRunning",!1);a(this,"config");a(this,"currentPosition",{x:0,y:0});a(this,"animate",()=>{if(!this.isRunning||this.startTime===null)return;const e=performance.now(),i=A(this.startTime,e,this.config.speed,this.config.maxX,this.config.maxY);this.currentPosition=i,this.config.onPositionUpdate&&this.config.onPositionUpdate(i.x,i.y),this.animationFrameId=requestAnimationFrame(this.animate)});this.config={...e}}start(){this.isRunning||(this.isRunning=!0,this.startTime=performance.now(),this.animate())}stop(){this.isRunning&&(this.isRunning=!1,this.animationFrameId!==null&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null))}reset(){this.stop(),this.startTime=null,this.currentPosition={x:0,y:0}}getState(){return{positionX:this.currentPosition.x,positionY:this.currentPosition.y,isRunning:this.isRunning,elapsedTime:this.startTime?performance.now()-this.startTime:0}}getPosition(){return{...this.currentPosition}}getIsRunning(){return this.isRunning}}const v={colors:["#667eea","#764ba2","#f093fb","#f5576c"],angle:0,speed:100,container:null};class E{constructor(e={}){a(this,"config");a(this,"animator",null);a(this,"container");a(this,"isMounted",!1);const i=Object.fromEntries(Object.entries(e).filter(([r,n])=>n!==void 0));this.config={...v,...i},this.container=this.config.container||document.body}mount(){this.isMounted||(this.isMounted=!0,this.animator=this.createAnimator(),this.animator.start())}unmount(){this.isMounted&&(this.animator!==null&&this.animator.stop(),this.animator=null,this.isMounted=!1,this.container.style.background="")}getIsMounted(){return this.isMounted}getAnimator(){return this.animator}getConfig(){return{...this.config}}updateConfig(e){const i=Object.fromEntries(Object.entries(e).filter(([r,n])=>n!==void 0));if(this.config={...this.config,...i},this.isMounted){const r=this.animator!==null&&this.animator.getIsRunning();this.animator!==null&&this.animator.stop(),this.animator=null,this.animator=this.createAnimator(),r&&this.animator!==null&&this.animator.start()}}createAnimator(){const e={speed:this.config.speed,maxX:2e3,maxY:2e3,onPositionUpdate:(i,r)=>this.updateGradient(i)};return new C(e)}updateGradient(e){const i=e/2e3*360,r=this.config.angle+i,n={colors:this.config.colors,angle:r};try{const o=x(n);this.container.style.background=o}catch(o){console.error("Failed to create gradient:",o)}}}const f={colors:["#667eea","#764ba2","#f093fb","#f5576c"],duration:3e3,angle:45};let s=null;function F(t=f){s!==null&&(s.unmount(),s=null);const e={colors:t.colors,angle:t.angle,speed:2e3/Math.max(t.duration,1)*100};s=new E(e),s.mount(),T()}function d(){if(s!==null)if(document.hidden){const t=s.getAnimator();t!==null&&t.getIsRunning()&&t.stop()}else{const t=s.getAnimator();t!==null&&!t.getIsRunning()&&t.start()}}function T(){document.removeEventListener("visibilitychange",d),document.addEventListener("visibilitychange",d)}function R(){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("id","dancing-robot"),t.setAttribute("viewBox","0 0 200 300"),t.setAttribute("width","150"),t.setAttribute("height","225"),t.setAttribute("class","dancing-robot"),t.setAttribute("role","img"),t.setAttribute("aria-label","Dancing robot animation"),t.innerHTML=`
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
  `,t}function I(t){const e=document.getElementById(t);if(!e)return console.warn(`Container with ID "${t}" not found`),null;const i=R();return e.appendChild(i),i}const M={message:"This site can be modified by anyone participating in chaoscraft.dev.",linkUrl:"https://app.chaoscraft.dev",linkText:"Click here to participate!"};function O(t={}){const e={...M,...t},i=document.createElement("div");i.id="chaoscraft-banner",i.className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white py-3 px-4 text-center",i.setAttribute("role","banner"),i.setAttribute("aria-label","ChaosCraft participation announcement");const r=document.createElement("div");r.className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto";const n=document.createElement("span");n.className="text-sm sm:text-base font-medium",n.textContent=e.message;const o=document.createElement("a");return o.href=e.linkUrl,o.target="_blank",o.rel="noopener noreferrer",o.className="text-sm sm:text-base font-semibold underline hover:text-yellow-200 transition-colors duration-200",o.textContent=e.linkText,o.setAttribute("aria-label",`${e.linkText} (opens in a new tab)`),r.appendChild(n),r.appendChild(o),i.appendChild(r),i}function k(t,e={}){let i;i=document.body;const r=O(e);return i.insertBefore(r,i.firstChild),r}typeof document<"u"&&document.addEventListener("DOMContentLoaded",()=>{k(),F(f),I("robot-container")});
//# sourceMappingURL=main-BuSLFHGB.js.map
