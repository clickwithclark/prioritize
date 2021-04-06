(()=>{"use strict";function e(e){e.contentEditable=!1,e.style.backgroundColor="inherit",e.style.color="inherit"}const t=document.querySelector("#todoList");function o(e){const o=document.createElement("li");o.draggable="true";const n=document.createElement("span"),r=document.createElement("i"),s=document.createElement("span"),c=document.createElement("i"),a=document.createElement("span"),i=document.createElement("i"),d=document.createElement("span");n.appendChild(r),s.className="grip",a.className="edit",n.className="checkmark",s.appendChild(c),a.appendChild(i),i.className="fas fa-edit",c.className="fas fa-arrows-alt-v",r.className="far fa-check-square",d.className="main-message",o.appendChild(d),o.dataset.id=e.id,d.innerText=e.category?`[${e.category}] ${e.message}`:`${e.message}`,e.completed&&(d.classList.add("completed"),n.classList.add("show-checkmark")),o.insertAdjacentElement("afterbegin",n),o.insertAdjacentElement("beforeend",s),o.insertAdjacentElement("beforeend",a),t.append(o)}function n(){return JSON.parse(localStorage.getItem("state"))}function r(){const e={...{...n()}?.todos};return 0===Object.keys(e).length?(document.querySelector("#todoList").style.opacity="0.5",{2592696:{id:2592696,message:"Pay electric bill",date:"2021-03-30T02:05:02.587Z",category:null,completed:!1},12462012:{id:"12462012",message:" feed dog",date:"2021-03-30T02:04:30.913Z",category:"Chores",completed:!1},41152409:{id:41152409,message:"cheese",date:"2021-03-30T02:03:53.599Z",category:"Grocery",completed:!1},53541349:{id:53541349,message:"milk",date:"2021-03-30T02:03:53.599Z",category:"Grocery",completed:!1},95110512:{id:95110512,message:" dishes",date:"2021-03-30T02:04:20.509Z",category:"Chores",completed:!1},98802921:{id:"98802921",message:"fix Timmy's bicycle",date:"2021-03-30T02:12:28.203Z",category:null,completed:!1}}):e}function s(e){const t={...n()},o={...t?.todos};0===Object.keys(o).length&&(document.querySelector("#todoList").style.opacity="1"),Object.assign(o,{[e.id]:e}),t.order=t?.order??[],t.order=[e.id,...t.order],t.todos=o,localStorage.setItem("state",JSON.stringify(t))}function c(e){const t={...n()},o={...t?.todos};if(0===Object.keys(o).length)return;let r=o[e.id];r={...r,...e},Object.assign(o,{[r.id]:r}),t.todos=o,localStorage.setItem("state",JSON.stringify(t))}function a(e){const t={...n()},o=[];e.forEach((e=>{o.push(+e[0])})),t.order=o,localStorage.setItem("state",JSON.stringify(t))}const i=function(){const e=[...document.querySelectorAll("li")],t=[...document.querySelectorAll("[data-draggable-container]")];e.forEach((e=>{e.addEventListener("dragstart",(()=>{e.classList.add("dragging")})),e.addEventListener("dragend",(()=>{document.querySelector("#todoList").style.cursor="default",e.classList.remove("dragging"),function(){const e=[...document.querySelectorAll("li")],t=[];e.forEach((e=>{t.push(+e.dataset.id)}));const o=n();t.length>0&&(o.order=t,localStorage.setItem("state",JSON.stringify(o)))}()}))})),t.forEach((e=>{e.addEventListener("dragover",(t=>{t.preventDefault();const o=function(e,t){return[...e.querySelectorAll('[draggable="true"]:not(.dragging)')].reduce(((e,o)=>{const n=o.getBoundingClientRect(),r=t-n.top-n.height/2;return r<0&&r>e.offset?{offset:r,element:o}:e}),{offset:Number.NEGATIVE_INFINITY}).element}(e,t.clientY),n=document.querySelector(".dragging");n.opacity="0.5",null!=o?e.insertBefore(n,o):e.appendChild(n)}))}))};function d(e){const t=document.querySelector("#info-bubble"),o=document.querySelector("#info-message"),n=document.querySelector("#logo");window.scrollTo({top:0,behavior:"smooth"}),n.src="../assets/img/oops.png",t.style.visibility="visible",o.textContent=e.message,setTimeout((()=>{t.style.visibility="hidden",o.textContent="",n.src="",n.src="../assets/img/cwc.png"}),3e3)}function l(){document.querySelector("#todoList").innerHTML="";const e=r(),t=n()?.order?.order??[];try{if(0===t.length)return Object.keys(e).forEach((t=>{o(e[t])})),void i();t.forEach((t=>{o(e[+t])})),i()}catch(e){d(e)}}function u(e){let t=null,o=e;var n;return-1!==e.indexOf("(")&&(t=e.match(/\((.*)\)/).pop(),o=e.replace(`(${t})`,"")),t&&(t=(n=t)[0].toUpperCase()+n.slice(1)),{id:Math.floor(1e8*Math.random()),message:o,date:new Date,category:t,completed:!1}}function g(t){const o=t.target.closest("li").querySelector(".main-message");if(o.classList.add("editing-in-progress"),o.innerText,o.classList.contains("completed"))return l();o.contentEditable=!0,o.focus(),o.style.backgroundColor="white",o.style.color="black";let n=o.innerText.replace("[","(");n=n.replace("]",")"),o.innerText=n;const r=window.getSelection(),c=Math.floor(o.innerText.length/2),a=document.createRange();a.setStart(o.childNodes[0],c),a.collapse(!0),r.removeAllRanges(),r.addRange(a),o.addEventListener("keydown",(t=>{"Enter"===t.key&&(t.preventDefault(),e(o),function(e){const t=e.target;!function(e){const{id:t}=e.closest("li").dataset,o=u(e.innerText);o.id=t,s(o),l()}(t),t.classList.remove("editing-in-progress")}(t))}))}function m(e){s(u(e)),l()}function p(e,t,o){document.addEventListener(e,(e=>{e.target.closest(t)&&o(e)}))}const y=function(e){let t=[],n=1;return{sort(){t=Object.entries(r());try{if(0===t.length)return;t.sort(((e,t)=>{return o=e[1].date,(t[1].date>o?1:-1)*n;var o})),n*=-1}catch(e){console.error(e)}document.querySelector("#todoList").innerHTML="",t.forEach((e=>{o({...e[1]})})),a(t),i()}}}(),f=function(e){let t=[],n=1;return{sort(){t=Object.entries(r());try{if(0===t.length)return;t.sort(((e,t)=>{return o=e[1].category,(t[1].category>o?1:-1)*n;var o})),n*=-1}catch(e){console.error(e)}document.querySelector("#todoList").innerHTML="",t.forEach((e=>{o({...e[1]})})),a(t),i()}}}();function h(){p("keydown","#todoInput",(e=>{if("Enter"===e.key)try{if(""===e.target.value.trim())throw new Error("Woops, you have to enter something first!");(function(){const e=document.querySelector("#todoInput").value.trim();-1===e.indexOf(",")?m(e):e.split(",").forEach((e=>{m(e)}))})(),e.target.value=""}catch(e){d(e),console.error(e)}})),p("focusout",".main-message",(t=>{e(t.target),l()})),p("pointerup",".edit",g),p("pointerup",".drop-down-entry",(()=>{const e=document.querySelector("#todoInput");e.classList.toggle("pop-out-fade-out"),e.focus()})),p("pointerdown",".grip",(e=>{e.target.style.cursor="grabbing",document.querySelector("#todoList").style.cursor="grabbing"})),p("pointerup","#todoList",(e=>{const t=document.querySelector("#todoList");[...t.querySelectorAll(".grip")].forEach((e=>{e.style.setProperty("cursor","grab")})),t.style.cursor="default"})),p("pointerdown",".main-message",(e=>{const t=e.target;t.classList.contains("editing-in-progress")||(t.classList.toggle("completed"),t.previousElementSibling.classList.toggle("show-checkmark"),function(e){const t=e.target,o=e.target.closest("li"),{id:n}=o.dataset;if(t.classList.contains("completed"))return c({id:n,completed:!0});c({id:n,completed:!1})}(e))})),p("pointerdown",".checkmark",(e=>{const t=e.target.closest("li"),{id:o}=t.dataset;t.style.transition="0.3s",t.style.opacity=0,t.style.marginTop="-40px",function(e){const t={...n()},o={...t?.todos};delete o[e],t.todos=o,localStorage.setItem("state",JSON.stringify(t))}(o),setTimeout((()=>{t.remove(),l()}),400)})),p("pointerdown",".date-sort",y.sort),p("pointerdown",".category-sort",f.sort),l()}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",h):h()})();