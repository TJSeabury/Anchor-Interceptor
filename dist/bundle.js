(()=>{"use strict";class t{constructor(t){this.easings={quadIn:t=>Math.pow(t,2),circIn:t=>1-Math.sin(Math.acos(t)),quadOut:this.makeEaseOut((t=>Math.pow(t,2))),circOut:this.makeEaseOut((t=>1-Math.sin(Math.acos(t)))),quadInOut:this.makeEaseInOut((t=>Math.pow(t,2))),circInOut:this.makeEaseInOut((t=>1-Math.sin(Math.acos(t)))),linear:t=>t},this.frameRate=t}animate(t){const e=performance.now(),r=e+t.duration,s=1e3/this.frameRate;let a=e,n=a,i=a-n,o=a-e;const c=()=>{if(i>=s){n=a;let e=o/t.duration;try{t.draw(e)}catch(t){console.error("Animation failed with error: ",t)}}a=performance.now(),i=a-n,o=a-e,a<r?requestAnimationFrame(c):(t.draw(1),!0===t.loop&&this.animate(t))};requestAnimationFrame(c)}makeEaseOut(t){return function(e){return 1-t(1-e)}}makeEaseInOut(t){return function(e){return e<.5?t(2*e)/2:(2-t(2*(1-e)))/2}}}class e{constructor(r,s=[e.targetClassname]){this.a=window.a||(window.a=new t(20)),this.header=function(t){if(!t)return null;let e=document.querySelector(t);return void 0!==e||null!==e?e:null}(r),this.headerOffset=this.header?this.header.offsetHeight:0,this.targets=s;for(const t of this.targets){const r=Array.from(document.querySelectorAll(t));for(const s of r)if("a"!==s.localName){const r=s.querySelector("a");r.classList.contains(e.targetClassname)||r.classList.add(e.targetClassname),s.classList.remove(t)}else s.classList.contains(e.targetClassname)||s.classList.add(e.targetClassname)}!0===this.checkForTarget()&&window.addEventListener("load",(()=>{this.doAnimate(this.getTarget())})),window.addEventListener("click",(t=>{this.clickHandler(t)}))}setTarget(t){sessionStorage.setItem("anchorTarget",t)}getTarget(){return sessionStorage.getItem("anchorTarget")}removeTarget(){return!!sessionStorage.getItem("anchorTarget")&&(sessionStorage.removeItem("anchorTarget"),!0)}checkForTarget(){return null!==sessionStorage.getItem("anchorTarget")&&""!==sessionStorage.getItem("anchorTarget")}getLinkFromTarget(t){if(null===t)return null;for(;!1==t instanceof HTMLAnchorElement;)if(null===(t=t.parentElement))return null;return t}getStripURL(t){const e=t.substring(0,t.indexOf("#"))||t;return"/"===e.charAt(e.length-1)?e:e+"/"}getTargetID(t){const e=t.href.substring(t.href.indexOf("#")+1);return"/"===e[0]||"!"===e[0]?null:e}doNavigate(t){window.location.href=t}doAnimate(t){const e=document.getElementById(t);if(void 0===e)return;let r=this.getScrollAmount(e)-this.headerOffset;0!==r?(this.a.animate({duration:1e3,easing:this.a.easings.quadInOut,draw:t=>{this.headerOffset=this.header?this.header.offsetHeight:0,r=this.getScrollAmount(e)-this.headerOffset,document.documentElement.scrollTop+=r*t,document.body.scrollTop+=r*t},loop:!1}),this.removeTarget()):this.removeTarget()}getScrollAmount(t){return t.getBoundingClientRect().top}hasIntersectingClass(t,e){return class{static intersect(t,e){return t.filter((t=>e.includes(t)))}static difference(t,e){return t.filter((t=>!e.includes(t)))}static symetricDifference(t,e){return this.difference(t,e).concat(this.difference(e,t))}static union(t,e){return[...new Set([...t,...e])]}}.intersect(t,e).length>0}clickHandler(t){const r=this.getLinkFromTarget(t.target);if(null===r)return;if(this.targets.length>0&&!this.hasIntersectingClass(Array.from(r.classList),[e.targetClassname]))return;t.preventDefault();const s=r.href,a=this.getStripURL(r.href),n=this.getStripURL(window.location.href),i=this.getTargetID(r);null===i?(console.log(s),this.doNavigate(s)):a===n?this.doAnimate(i):(this.setTarget(i),this.doNavigate(a))}}e.targetClassname="js-smooth-scroll"})();
//# sourceMappingURL=bundle.js.map