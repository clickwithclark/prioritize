if(!self.define){let e,n={};const s=(s,i)=>(s=new URL(s+".js",i).href,n[s]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=n,document.head.appendChild(e)}else e=s,importScripts(s),n()})).then((()=>{let e=n[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(n[o])return;let l={};const c=e=>s(e,o),t={module:{uri:o},exports:l,require:c};n[o]=Promise.all(i.map((e=>t[e]||c(e)))).then((e=>(r(...e),l)))}}define(["./workbox-b26eb3b8"],(function(e){"use strict";e.setCacheNameDetails({prefix:"clark-assets"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"./css/main.d9dce975e17cb4670d88.css",revision:null},{url:"./index.html",revision:"96ec255bc36376e7a71c459d50494e6a"},{url:"./js/bootstrap.359fadd11533544b41e5.js",revision:null},{url:"./js/font-awesome.5275c9a96582840f5d7a.js",revision:null},{url:"./js/main.a4b11ad4c65243f71bb7.js",revision:null},{url:"./manifest.json",revision:"af3c4738bc32a1a3b45ff6b2d6f8e640"},{url:"fonts/CabinSketchab0ff884e785c1272279.woff2",revision:null},{url:"fonts/Neucha22d709d0358065f913da7.woff2",revision:null},{url:"fonts/Neuchab13fb60584abc71457ed.woff2",revision:null},{url:"img/backgrounda5265f38a651f8fd4c18.png",revision:null},{url:"img/cwc-shadesa05dc6e0694f089c83c8.png",revision:null},{url:"img/oopsfe704e0dccb8e85da8a9.png",revision:null}],{}),e.cleanupOutdatedCaches(),e.registerRoute(/https?:\/\/[a-zA-Z]+\.com\/.*/,new e.StaleWhileRevalidate({cacheName:"clark-assets",plugins:[new e.ExpirationPlugin({maxEntries:1e3})]}),"GET")}));
//# sourceMappingURL=service-worker.js.map
