if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(a[n])return;let r={};const l=e=>s(e,n),d={module:{uri:n},exports:r,require:l};a[n]=Promise.all(i.map((e=>d[e]||l(e)))).then((e=>(c(...e),r)))}}define(["./workbox-1846d813"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/404_animation.json",revision:"0537f90fcf02b565cbb912a1bdc7395f"},{url:"/_next/static/chunks/0c428ae2-48f6538520d763601691.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/1a48c3c1-fdee3e9e3483c59ba36e.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/252f366e-70b4c3ef292f3632ae3e.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/26-cf83efed27500d506faf.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/337-beb642806299674c6f95.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/408-d1cf613cae0dbec3db10.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/456-762ba74c2a40b3b1e37a.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/481-08975d54014b918cd943.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/490-2a39049dff9cf92aced1.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/504-2470b2fb4c52f8d143ab.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/6728d85a-598dadc825ea1e28a587.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/685-79fc4e3b2e44aa8ef6ec.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/75-4a793489f0204d2763ad.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/78e521c3-91afcdf3d36e94b965ae.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/7f0c75c1-f8b4e740b90c4307ed06.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/95b64a6e-b6e36819322817ac1413.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/ae51ba48-cf067149b90908a16c31.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/ea88be26-11c04d73919658bb0eee.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/framework-b5d09c9b25f4537c70b3.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/main-53c828d153756ab6089c.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/pages/404-d6a8a023d19f39b6e469.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/pages/_app-7529df3c04445df0a184.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/pages/_error-737a04e9a0da63c9d162.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/pages/help-fd8891847246cc7a99fd.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/pages/index-32429d0f8e347ea44f5a.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/pages/playlist-a4ae826e56178652b19d.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/pages/playlists-86d9674d4f172fec490c.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/pages/video-de276ae022802a2df612.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/chunks/webpack-0f1c90494df18b791164.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/css/0dcb93a77521d54a5cc5.css",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/css/299fd663b9b7db4d0853.css",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/css/324ea4c8a125a5b4752b.css",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/css/5e2f77efccdadb300b1e.css",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/css/8ba7d16c3ff26d048d3a.css",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/hV9NDvTevs0mgaNODncDF/_buildManifest.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/hV9NDvTevs0mgaNODncDF/_ssgManifest.js",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/media/CeraRoundPro-Bold.d5d5f0d75db4717277ec87c6f3e05309.woff",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/media/CeraRoundPro-Light.7350cc889a4ac294f13c3da2f831e001.woff",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/media/CeraRoundPro-Medium.647ae5a91bb7dba38f076264c7b0284c.woff",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/_next/static/media/CeraRoundPro-Regular.51f02b1b1e211d8d9d8af32f39147068.woff",revision:"hV9NDvTevs0mgaNODncDF"},{url:"/android-chrome-192x192.png",revision:"b04548db57841992629a71558f8acaa3"},{url:"/android-chrome-384x384.png",revision:"99a683f3211e03c54373666f79f338d2"},{url:"/apple-touch-icon.png",revision:"e61cbede46017f383b9b35a0e7c2750b"},{url:"/browserconfig.xml",revision:"3e892d852e3ad6515b80ab43be65bde5"},{url:"/dark/apple-splash-1125-2436.jpeg",revision:"83d6980cb89f22277698c4677f936eb8"},{url:"/dark/apple-splash-1136-640.jpeg",revision:"01cb84631c58242734b289d7e02e9f1c"},{url:"/dark/apple-splash-1170-2532.jpeg",revision:"a4b330d058fdeb377a0f5dbdc3f3c23f"},{url:"/dark/apple-splash-1242-2208.jpeg",revision:"f18ab09b4cbcf50852f244ad84542846"},{url:"/dark/apple-splash-1242-2688.jpeg",revision:"376652b638670888ca6597568d18a4e3"},{url:"/dark/apple-splash-1284-2778.jpeg",revision:"2a094a3bb855ac55e969a76be6cd402b"},{url:"/dark/apple-splash-1334-750.jpeg",revision:"2c4afe3f6431a4a9801e733a8f193925"},{url:"/dark/apple-splash-1536-2048.jpeg",revision:"63baf8513ae058db41e0a66991c11f6d"},{url:"/dark/apple-splash-1620-2160.jpeg",revision:"6e28cefd92bb13c9c152abc0bcfffa56"},{url:"/dark/apple-splash-1668-2224.jpeg",revision:"91dbb898aaa0dd069c5dddbe7bcd5fad"},{url:"/dark/apple-splash-1668-2388.jpeg",revision:"c0f2bcbeabea853f4358cdbd941a0e3b"},{url:"/dark/apple-splash-1792-828.jpeg",revision:"c1b12f29d0f324dccaa48c8b4de76592"},{url:"/dark/apple-splash-2048-1536.jpeg",revision:"268214baa6f27cb42afe1fe7257aca3a"},{url:"/dark/apple-splash-2048-2732.jpeg",revision:"5d6980761edb8bfcadd621c5518c09f9"},{url:"/dark/apple-splash-2160-1620.jpeg",revision:"6fd795c65ff39840726f02b261a2051d"},{url:"/dark/apple-splash-2208-1242.jpeg",revision:"87b916968b6bcf4c615a455e2942d5dc"},{url:"/dark/apple-splash-2224-1668.jpeg",revision:"24fe95e85f2edebc1e1ddd29c006c4c1"},{url:"/dark/apple-splash-2388-1668.jpeg",revision:"8e15745c3d327a84b3a7bf0cc46cf625"},{url:"/dark/apple-splash-2436-1125.jpeg",revision:"e2f974e6e906e71316d2eaabbe711b0c"},{url:"/dark/apple-splash-2532-1170.jpeg",revision:"3b740dc7f3f162896d427063586412fd"},{url:"/dark/apple-splash-2688-1242.jpeg",revision:"4c190d8f2b85a122507c8375781b3e22"},{url:"/dark/apple-splash-2732-2048.jpeg",revision:"c8c51bc513b9fe11807326c5335b596e"},{url:"/dark/apple-splash-2778-1284.jpeg",revision:"fe17d9148c094b449aa4789085972ed5"},{url:"/dark/apple-splash-640-1136.jpeg",revision:"bdb61f47b3f2786569a2c4385c3b4c7b"},{url:"/dark/apple-splash-750-1334.jpeg",revision:"12fe0a7a7660281c09cfb974147ac7fe"},{url:"/dark/apple-splash-828-1792.jpeg",revision:"8b733d7bb0b5d6c768f86ae2b43f4601"},{url:"/favicon-16x16.png",revision:"6983114f37225e82f35666c854bba316"},{url:"/favicon-196.png",revision:"66297de0b7d55b4799f27dfa9da0d658"},{url:"/favicon-32x32.png",revision:"634d3de0d6571a10810e47078d977a45"},{url:"/favicon.ico",revision:"c724811bac03f0f416e237fc2b7921e1"},{url:"/fonts/CeraRoundPro-Bold.woff",revision:"6ecafd596e45505827b3088a49b1a132"},{url:"/fonts/CeraRoundPro-Light.woff",revision:"fbc5cf21d2d712c925680afc9d21ad37"},{url:"/fonts/CeraRoundPro-Medium.woff",revision:"f8455aed3690e53167c56bc5add9fbdd"},{url:"/fonts/CeraRoundPro-Regular.woff",revision:"6b2e6fb69972e2f4611f85c7785cdfe1"},{url:"/light/apple-splash-1125-2436.jpeg",revision:"505279468f7a51e8df46f3edd3351b4f"},{url:"/light/apple-splash-1136-640.jpeg",revision:"b999ea942ed9e145882c8d38301148ca"},{url:"/light/apple-splash-1170-2532.jpeg",revision:"f2e408321ce6465d47a7c09c83bd2338"},{url:"/light/apple-splash-1242-2208.jpeg",revision:"02d4ceb19274cf7c0fd49208fbf9a80c"},{url:"/light/apple-splash-1242-2688.jpeg",revision:"9460f947c4a879b42a3713c866985f40"},{url:"/light/apple-splash-1284-2778.jpeg",revision:"a849c7137d51bdf8125741cc9bfb22c2"},{url:"/light/apple-splash-1334-750.jpeg",revision:"e3fe1e659a435299ad3166f457ead11b"},{url:"/light/apple-splash-1536-2048.jpeg",revision:"deb42d2c83cdfdc454f0921d832eccd7"},{url:"/light/apple-splash-1620-2160.jpeg",revision:"48a8851399023e328921b3d48f065ed6"},{url:"/light/apple-splash-1668-2224.jpeg",revision:"0bfabdb9143174148aba495951a25bad"},{url:"/light/apple-splash-1668-2388.jpeg",revision:"23c017bcfb3583456f83a34032f7b9a2"},{url:"/light/apple-splash-1792-828.jpeg",revision:"982186ded6956a6a2330ec5480b40b77"},{url:"/light/apple-splash-2048-1536.jpeg",revision:"94444e0e42c5b943a91565a2b08cd9d2"},{url:"/light/apple-splash-2048-2732.jpeg",revision:"38c2c1af56bbd75414a14c6fa1966d29"},{url:"/light/apple-splash-2160-1620.jpeg",revision:"0d1d52b805e074e621d8c7f7d69f328b"},{url:"/light/apple-splash-2208-1242.jpeg",revision:"0ed3372bab747ad6d54e35fbc67a2b58"},{url:"/light/apple-splash-2224-1668.jpeg",revision:"6391df07f1e6eb3a2ae3c2698f0a3337"},{url:"/light/apple-splash-2388-1668.jpeg",revision:"32d3857603544a3e9c216b5919c73e81"},{url:"/light/apple-splash-2436-1125.jpeg",revision:"a1380a072e4a8c1ab2af76c4c7834cfa"},{url:"/light/apple-splash-2532-1170.jpeg",revision:"33403ba147e7ef33c73bf8e69e482d9f"},{url:"/light/apple-splash-2688-1242.jpeg",revision:"b6655997b31057ddfde424df8ad29d38"},{url:"/light/apple-splash-2732-2048.jpeg",revision:"05b698ba60d72743c84edfce935e66a5"},{url:"/light/apple-splash-2778-1284.jpeg",revision:"0aea7e4ffab97ff0f2ea01f615e4cf6c"},{url:"/light/apple-splash-640-1136.jpeg",revision:"fc1ceaeede02eb1ad0c49431c213bd9b"},{url:"/light/apple-splash-750-1334.jpeg",revision:"9e7d757ad0248f33f72485251dd3ea9e"},{url:"/light/apple-splash-828-1792.jpeg",revision:"372d869e391ada7093841d01285a904c"},{url:"/logo.png",revision:"611f6232f988eeee8b26bba26b02ee30"},{url:"/manifest-icon-192.png",revision:"3a9735fe84c583ea9ede51eba41d1625"},{url:"/manifest-icon-512.png",revision:"403c2ec33a7c50ddc1346f3426a4cef3"},{url:"/mstile-150x150.png",revision:"171c6a5fb115a0ae1c009e396f2323f2"},{url:"/safari-pinned-tab.svg",revision:"9f62d2e0ded7820929c9ad2c93ea8396"},{url:"/site.webmanifest",revision:"459bb2c975030eebd2aeaf050d12323c"},{url:"/site_image.png",revision:"031295df3aa72e78f38340655d47333f"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:i})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
