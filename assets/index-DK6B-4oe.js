import{r as n,a as W,j as s,i as G,u as q,P as _,e as Z,d as z,L as Y,f as $,m as I,N as K,c as Q}from"./polish-CaTVpi3l.js";import{A as X,F as J}from"./Footer-DMsMrBgR.js";function D(a,o){if(typeof a=="function")return a(o);a!=null&&(a.current=o)}function ss(...a){return o=>{let t=!1;const i=a.map(v=>{const l=D(v,o);return!t&&typeof l=="function"&&(t=!0),l});if(t)return()=>{for(let v=0;v<i.length;v++){const l=i[v];typeof l=="function"?l():D(a[v],null)}}}}function es(...a){return n.useCallback(ss(...a),a)}class ts extends n.Component{getSnapshotBeforeUpdate(o){const t=this.props.childRef.current;if(G(t)&&o.isPresent&&!this.props.isPresent&&this.props.pop!==!1){const i=t.offsetParent,v=G(i)&&i.offsetWidth||0,l=G(i)&&i.offsetHeight||0,m=getComputedStyle(t),r=this.props.sizeRef.current;r.height=parseFloat(m.height),r.width=parseFloat(m.width),r.top=t.offsetTop,r.left=t.offsetLeft,r.right=v-r.width-r.left,r.bottom=l-r.height-r.top}return null}componentDidUpdate(){}render(){return this.props.children}}function as({children:a,isPresent:o,anchorX:t,anchorY:i,root:v,pop:l}){var f;const m=n.useId(),r=n.useRef(null),B=n.useRef({width:0,height:0,top:0,left:0,right:0,bottom:0}),{nonce:C}=n.useContext(W),y=((f=a.props)==null?void 0:f.ref)??(a==null?void 0:a.ref),x=es(r,y);return n.useInsertionEffect(()=>{const{width:u,height:w,top:A,left:b,right:e,bottom:c}=B.current;if(o||l===!1||!r.current||!u||!w)return;const d=t==="left"?`left: ${b}`:`right: ${e}`,h=i==="bottom"?`bottom: ${c}`:`top: ${A}`;r.current.dataset.motionPopId=m;const j=document.createElement("style");C&&(j.nonce=C);const M=v??document.head;return M.appendChild(j),j.sheet&&j.sheet.insertRule(`
          [data-motion-pop-id="${m}"] {
            position: absolute !important;
            width: ${u}px !important;
            height: ${w}px !important;
            ${d}px !important;
            ${h}px !important;
          }
        `),()=>{var S;(S=r.current)==null||S.removeAttribute("data-motion-pop-id"),M.contains(j)&&M.removeChild(j)}},[o]),s.jsx(ts,{isPresent:o,childRef:r,sizeRef:B,pop:l,children:l===!1?a:n.cloneElement(a,{ref:x})})}const ns=({children:a,initial:o,isPresent:t,onExitComplete:i,custom:v,presenceAffectsLayout:l,mode:m,anchorX:r,anchorY:B,root:C})=>{const y=q(is),x=n.useId();let f=!0,u=n.useMemo(()=>(f=!1,{id:x,initial:o,isPresent:t,custom:v,onExitComplete:w=>{y.set(w,!0);for(const A of y.values())if(!A)return;i&&i()},register:w=>(y.set(w,!1),()=>y.delete(w))}),[t,y,i]);return l&&f&&(u={...u}),n.useMemo(()=>{y.forEach((w,A)=>y.set(A,!1))},[t]),n.useEffect(()=>{!t&&!y.size&&i&&i()},[t]),a=s.jsx(as,{pop:m==="popLayout",isPresent:t,anchorX:r,anchorY:B,root:C,children:a}),s.jsx(_.Provider,{value:u,children:a})};function is(){return new Map}const F=a=>a.key||"";function P(a){const o=[];return n.Children.forEach(a,t=>{n.isValidElement(t)&&o.push(t)}),o}const os=({children:a,custom:o,initial:t=!0,onExitComplete:i,presenceAffectsLayout:v=!0,mode:l="sync",propagate:m=!1,anchorX:r="left",anchorY:B="top",root:C})=>{const[y,x]=Z(m),f=n.useMemo(()=>P(a),[a]),u=m&&!y?[]:f.map(F),w=n.useRef(!0),A=n.useRef(f),b=q(()=>new Map),e=n.useRef(new Set),[c,d]=n.useState(f),[h,j]=n.useState(f);z(()=>{w.current=!1,A.current=f;for(let k=0;k<h.length;k++){const p=F(h[k]);u.includes(p)?(b.delete(p),e.current.delete(p)):b.get(p)!==!0&&b.set(p,!1)}},[h,u.length,u.join("-")]);const M=[];if(f!==c){let k=[...f];for(let p=0;p<h.length;p++){const g=h[p],O=F(g);u.includes(O)||(k.splice(p,0,g),M.push(g))}return l==="wait"&&M.length&&(k=M),j(P(k)),d(f),null}const{forceRender:S}=n.useContext(Y);return s.jsx(s.Fragment,{children:h.map(k=>{const p=F(k),g=m&&!y?!1:f===h||u.includes(p),O=()=>{if(e.current.has(p))return;if(b.has(p))e.current.add(p),b.set(p,!0);else return;let R=!0;b.forEach(T=>{T||(R=!1)}),R&&(S==null||S(),j(A.current),m&&(x==null||x()),i&&i())};return s.jsx(ns,{isPresent:g,initial:!w.current||t?void 0:!1,custom:o,presenceAffectsLayout:v,mode:l,root:C,onExitComplete:g?void 0:O,anchorX:r,anchorY:B,children:k},p)})})},ls=`      <svg class="frame" viewBox="0 0 619 377" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M29.7988 374.291H65.9186L63.4741 376.736C63.3047 376.905 63.075 377 62.8355 377H32.8818C32.6423 377 32.4126 376.905 32.2433 376.736L29.7988 374.291Z" fill="url(#mb-p0)"/>
        <path d="M29.7988 374.291H65.9186L63.4741 376.736C63.3047 376.905 63.075 377 62.8355 377H32.8818C32.6423 377 32.4126 376.905 32.2433 376.736L29.7988 374.291Z" fill="url(#mb-p1)" fill-opacity="0.7"/>
        <path d="M29.3473 374.291H66.37L65.5445 375.117C65.2058 375.455 64.7465 375.646 64.2675 375.646H31.4498C30.9709 375.646 30.5115 375.455 30.1728 375.117L29.3473 374.291Z" fill="url(#mb-p2)"/>
        <path d="M552.632 374.291H588.752L586.308 376.736C586.138 376.905 585.909 377 585.669 377H555.715C555.476 377 555.246 376.905 555.077 376.736L552.632 374.291Z" fill="url(#mb-p3)"/>
        <path d="M552.632 374.291H588.752L586.308 376.736C586.138 376.905 585.909 377 585.669 377H555.715C555.476 377 555.246 376.905 555.077 376.736L552.632 374.291Z" fill="url(#mb-p4)" fill-opacity="0.7"/>
        <path d="M552.181 374.291H589.204L588.378 375.117C588.039 375.455 587.58 375.646 587.101 375.646H554.283C553.804 375.646 553.345 375.455 553.006 375.117L552.181 374.291Z" fill="url(#mb-p5)"/>
        <g filter="url(#mb-f0)">
          <path d="M0 353.522C0 353.023 0.404284 352.619 0.902994 352.619H617.648C618.147 352.619 618.551 353.023 618.551 353.522V363.004C618.551 369.237 613.497 374.291 607.263 374.291H11.2874C5.05353 374.291 0 369.237 0 363.004V353.522Z" fill="url(#mb-p6)"/>
          <path d="M0 353.522C0 353.023 0.404284 352.619 0.902994 352.619H617.648C618.147 352.619 618.551 353.023 618.551 353.522V363.004C618.551 369.237 613.497 374.291 607.263 374.291H11.2874C5.05353 374.291 0 369.237 0 363.004V353.522Z" fill="url(#mb-p7)" fill-opacity="0.7"/>
        </g>
        <g filter="url(#mb-f1)">
          <path d="M261.868 352.619H356.683V352.619C356.683 356.359 353.65 359.392 349.91 359.392H268.641C264.9 359.392 261.868 356.359 261.868 352.619V352.619Z" fill="url(#mb-p8)"/>
        </g>
        <g filter="url(#mb-f2)">
          <path d="M48.3102 13.0934C48.3102 5.86213 54.1723 0 61.4036 0H557.147C564.379 0 570.241 5.86212 570.241 13.0934V352.619H48.3102V13.0934Z" fill="#6D6E70"/>
        </g>
        <path d="M49.2132 13.0934C49.2132 6.36087 54.671 0.903015 61.4036 0.903015H557.147C563.88 0.903015 569.338 6.36085 569.338 13.0934V352.619H49.2132V13.0934Z" fill="#1F1F1F"/>
        <path d="M50.5677 13.0935C50.5677 7.10894 55.4191 2.25751 61.4036 2.25751H557.147C563.132 2.25751 567.983 7.10892 567.983 13.0934V340.429H50.5677V13.0935Z" fill="black"/>
        <rect x="50.5677" y="340.429" width="517.416" height="12.1904" fill="url(#mb-p9)"/>
        <defs>
          <filter id="mb-f0" x="0" y="352.619" width="618.551" height="22.1234" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="0.451497"/>
            <feGaussianBlur stdDeviation="0.225748"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
          </filter>
          <filter id="mb-f1" x="260.514" y="351.716" width="97.5233" height="7.67545" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feMorphology radius="1.35449" operator="dilate" in="SourceAlpha" result="effect1_innerShadow"/>
            <feOffset dx="1.80599"/>
            <feGaussianBlur stdDeviation="1.35449"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feMorphology radius="1.35449" operator="dilate" in="SourceAlpha" result="effect2_innerShadow"/>
            <feOffset dx="-1.80599"/>
            <feGaussianBlur stdDeviation="1.35449"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
            <feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="-0.902994"/>
            <feGaussianBlur stdDeviation="0.451497"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"/>
            <feBlend mode="normal" in2="effect2_innerShadow" result="effect3_innerShadow"/>
          </filter>
          <filter id="mb-f2" x="48.3102" y="0" width="521.93" height="352.619" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feMorphology radius="0.225748" operator="erode" in="SourceAlpha" result="effect1_innerShadow"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="0.225748"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.666667 0 0 0 0 0.666667 0 0 0 0 0.666667 0 0 0 1 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
          </filter>
          <linearGradient id="mb-p0" x1="31.1533" y1="376.323" x2="64.3383" y2="376.323" gradientUnits="userSpaceOnUse"><stop stop-color="#494949"/><stop offset="0.202928" stop-color="#202020"/><stop offset="0.790963" stop-color="#202020"/><stop offset="1" stop-color="#494949"/></linearGradient>
          <linearGradient id="mb-p1" x1="47.8587" y1="377" x2="47.8587" y2="375.646" gradientUnits="userSpaceOnUse"><stop offset="0.462197" stop-color="#555555"/><stop offset="1" stop-color="#494949" stop-opacity="0"/></linearGradient>
          <linearGradient id="mb-p2" x1="29.3473" y1="375.194" x2="65.9185" y2="375.194" gradientUnits="userSpaceOnUse"><stop stop-color="#8E8F93"/><stop offset="0.0520804" stop-color="#A7A7A9"/><stop offset="0.153" stop-color="#535459"/><stop offset="0.380607" stop-color="#A7A7A9"/><stop offset="0.57171" stop-color="#A7A7A9"/><stop offset="0.835819" stop-color="#535459"/><stop offset="0.943181" stop-color="#A7A7A9"/><stop offset="1" stop-color="#8E8F93"/></linearGradient>
          <linearGradient id="mb-p3" x1="553.987" y1="376.323" x2="587.172" y2="376.323" gradientUnits="userSpaceOnUse"><stop stop-color="#494949"/><stop offset="0.202928" stop-color="#202020"/><stop offset="0.790963" stop-color="#202020"/><stop offset="1" stop-color="#494949"/></linearGradient>
          <linearGradient id="mb-p4" x1="570.692" y1="377" x2="570.692" y2="375.646" gradientUnits="userSpaceOnUse"><stop offset="0.462197" stop-color="#555555"/><stop offset="1" stop-color="#494949" stop-opacity="0"/></linearGradient>
          <linearGradient id="mb-p5" x1="552.181" y1="375.194" x2="588.752" y2="375.194" gradientUnits="userSpaceOnUse"><stop stop-color="#8E8F93"/><stop offset="0.0520804" stop-color="#A7A7A9"/><stop offset="0.153" stop-color="#535459"/><stop offset="0.380607" stop-color="#A7A7A9"/><stop offset="0.57171" stop-color="#A7A7A9"/><stop offset="0.835819" stop-color="#535459"/><stop offset="0.943181" stop-color="#A7A7A9"/><stop offset="1" stop-color="#8E8F93"/></linearGradient>
          <linearGradient id="mb-p6" x1="0" y1="363.455" x2="618.551" y2="363.455" gradientUnits="userSpaceOnUse"><stop stop-color="#A0A1A5"/><stop offset="0.0182411" stop-color="#D3D4D9"/><stop offset="0.0572677" stop-color="#6A6B70"/><stop offset="0.0871115" stop-color="#797A7F"/><stop offset="0.213824" stop-color="#A8A9AE"/><stop offset="0.786959" stop-color="#A8A9AE"/><stop offset="0.917556" stop-color="#797A7F"/><stop offset="0.946746" stop-color="#6A6B70"/><stop offset="0.978072" stop-color="#D3D4D9"/><stop offset="1" stop-color="#A0A1A5"/></linearGradient>
          <linearGradient id="mb-p7" x1="309.275" y1="352.619" x2="309.275" y2="374.291" gradientUnits="userSpaceOnUse"><stop stop-color="#858688" stop-opacity="0"/><stop offset="0.651042" stop-color="#737479"/><stop offset="0.927083" stop-color="#B7B8BD"/><stop offset="1" stop-color="#858688"/></linearGradient>
          <linearGradient id="mb-p8" x1="261.868" y1="356.231" x2="356.683" y2="356.231" gradientUnits="userSpaceOnUse"><stop stop-color="#C6C7CC"/><stop offset="0.467668" stop-color="#D0D1D6"/><stop offset="1" stop-color="#C6C7CC"/></linearGradient>
          <linearGradient id="mb-p9" x1="309.275" y1="340.429" x2="309.275" y2="352.619" gradientUnits="userSpaceOnUse"><stop stop-color="#232323"/><stop offset="1" stop-color="#0A0A0C"/></linearGradient>
        </defs>
      </svg>
`,rs=`      <svg class="notch-overlay" viewBox="0 0 619 377" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M277.219 7.67548H281.283C282.031 7.67548 282.637 8.2819 282.637 9.02997V13.9964C282.637 15.4926 283.85 16.7054 285.346 16.7054H333.656C334.903 16.7054 335.914 15.6947 335.914 14.4479V9.02997C335.914 8.2819 336.52 7.67548 337.268 7.67548H341.332H277.219Z" fill="black"/>
        <circle cx="309.275" cy="9.93296" r="2.25748" fill="url(#mb-lens)"/>
        <defs>
          <radialGradient id="mb-lens" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(309.275 9.93296) rotate(90) scale(2.25748)">
            <stop stop-color="#9797AB"/>
            <stop offset="0.391646" stop-color="#2C2C46"/>
            <stop offset="1" stop-color="#3F3F46"/>
          </radialGradient>
        </defs>
      </svg>
`;function cs(){return s.jsx(s.Fragment,{children:s.jsx("div",{style:{display:"contents"},dangerouslySetInnerHTML:{__html:ls}})})}function ds(){return s.jsx("div",{style:{display:"contents"},dangerouslySetInnerHTML:{__html:rs}})}const E=[{id:"search",eyebrow:"Search",key:"⌥ Space",title:s.jsxs(s.Fragment,{children:["Three letters in. ",s.jsx("span",{className:"accent",children:"Window in focus."})]}),lead:"⌥ Space, three letters, ↵ — right window, in front.",clips:[{src:"/videos/1-windows.mp4",captions:[{at:2.5,text:"Wait, how many do I have open?"},{at:6.5,text:"Which one is the project you want?"}]},{src:"/videos/1-search.mp4",captions:[{at:1,text:"⌥ Space."},{at:3.5,text:"Find any project."},{at:7,text:"Open it — in any editor."},{at:11.5,text:"Same shortcut, every project."},{at:16.5,text:"From anywhere."}]}]},{id:"switch",eyebrow:"Switch",key:"⌥ Tab",title:s.jsxs(s.Fragment,{children:["⌘ Tab for apps. ",s.jsx("span",{className:"accent",children:"⌥ Tab for windows."})]}),lead:"Every editor window, grouped by project, most-recent first.",clips:[{src:"/videos/2-option-tab.mp4",captions:[{at:1.5,text:"⌥ Tab — every window you have open."},{at:6,text:"Across every editor."},{at:11,text:"Same project, different IDE? Listed separately."},{at:18,text:"Pick. Press. Done."}]}]},{id:"actions",eyebrow:"Actions",key:"⌘ K",title:s.jsxs(s.Fragment,{children:["One actions library, ",s.jsx("span",{className:"accent",children:"every project."})]}),lead:"Define shortcuts once. The right action fires per project.",clips:[{src:"/videos/3-actions.mp4",captions:[{at:1,text:"Find your project."},{at:5,text:"Pick an action for it."},{at:8,text:"Open the repo on GitHub."},{at:13.5,text:"Same project, different action."},{at:18,text:"Reveal it in Finder."}]}]},{id:"notch",eyebrow:"Notch",key:"Always",title:s.jsxs(s.Fragment,{children:["The notch, ",s.jsx("span",{className:"accent",children:"finally useful."})]}),lead:"The active project lives in the notch. Always visible.",clips:[{src:"/videos/4-notch.mp4",captions:[{at:1.5,text:"Click the notch."},{at:4.5,text:"Every project window, one menu."},{at:9.5,text:"Pick — and you're there."},{at:15.5,text:"Same project, another IDE."},{at:19.5,text:"From any app, always one click away."}]}]}];function ps(){const a=n.useRef(null),o=n.useRef([]),t=n.useRef([]),[i,v]=n.useState(0),[l,m]=n.useState(0),[r,B]=n.useState(!1),[C,y]=n.useState(""),x=$(),f=[];E.forEach((e,c)=>{e.clips.forEach((d,h)=>f.push({featureIdx:c,clipIdx:h,clip:d}))});const u=f.findIndex(e=>e.featureIdx===i&&e.clipIdx===l);n.useEffect(()=>{const e=a.current;if(!e)return;const c=new IntersectionObserver(d=>{var h;return B(((h=d[0])==null?void 0:h.isIntersecting)??!1)},{threshold:.25});return c.observe(e),()=>c.disconnect()},[]),n.useEffect(()=>{x||o.current.forEach((e,c)=>{e&&(c===u&&r?(e.currentTime=0,e.play().catch(()=>{})):e.pause())})},[u,r,x]);function w(){if(E[i].clips.length===2&&l===0){m(1);return}v((i+1)%E.length),m(0)}function A(e){v(e),m(0)}n.useEffect(()=>{var S;const e=o.current[u],c=t.current[i];if(!e)return;const d=(c==null?void 0:c.querySelector(".mc-tab-fill"))??null,h=E[i],j=((S=h.clips[l])==null?void 0:S.captions)??[],M=()=>{if(d&&!x){let g=0,O=0;h.clips.forEach((T,L)=>{const V=f.findIndex(U=>U.featureIdx===i&&U.clipIdx===L),N=o.current[V],H=(N==null?void 0:N.duration)||0;g+=H,L<l?O+=H:L===l&&(O+=(N==null?void 0:N.currentTime)||0)});const R=g>0?Math.min(100,O/g*100):0;d.style.width=`${R}%`}const k=e.currentTime;let p="";for(const g of j)if(g.at<=k)p=g.text;else break;y(g=>g===p?g:p)};return y(""),e.addEventListener("timeupdate",M),()=>e.removeEventListener("timeupdate",M)},[i,l,u,x]),n.useEffect(()=>{t.current.forEach((e,c)=>{if(!e)return;const d=e.querySelector(".mc-tab-fill");d&&c!==i&&(d.style.width="0%")})},[i]);const b=E[i];return s.jsxs("section",{ref:a,className:"mc-section",id:"features","data-active":b.id,children:[s.jsx("div",{className:"mc-tabs",role:"tablist","aria-label":"Features",children:s.jsx("div",{className:"mc-tabs-pill",children:E.map((e,c)=>{const d=c===i;return s.jsxs("button",{ref:h=>{h&&(t.current[c]=h)},type:"button",role:"tab","aria-selected":d,className:`mc-tab ${d?"is-active":""}`,onClick:()=>A(c),children:[d&&s.jsx(I.span,{layoutId:"mc-tab-active-bg",className:"mc-tab-active-bg","aria-hidden":"true",transition:{type:"tween",duration:.85,ease:[.22,1,.36,1]}}),s.jsxs("span",{className:"mc-tab-content",children:[s.jsx("span",{className:"mc-tab-label",children:e.eyebrow}),s.jsx("span",{className:"mc-tab-key","aria-hidden":!d,children:e.key})]}),s.jsx("span",{className:"mc-tab-fill","aria-hidden":"true"})]},e.id)})})}),s.jsxs("div",{className:"mc-meta",children:[s.jsx(I.h3,{className:"mc-title",initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:x?0:.7,ease:[.22,1,.36,1]},children:b.title},`title-${b.id}`),s.jsx(I.p,{className:"mc-lead",initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:x?0:.7,delay:x?0:.14,ease:[.22,1,.36,1]},children:b.lead},`lead-${b.id}`)]}),s.jsx("div",{className:"mc-stage",children:s.jsx("div",{className:"mb-stage",children:s.jsx("div",{className:"macbook-wrap",children:s.jsxs("div",{className:"macbook",children:[s.jsx(cs,{}),s.jsxs("div",{className:"screen",children:[f.map((e,c)=>s.jsx("video",{ref:d=>{d&&(o.current[c]=d)},className:"mc-video",src:e.clip.src,muted:!0,playsInline:!0,preload:"auto","aria-label":`${E[e.featureIdx].eyebrow} demo`,onEnded:w,style:{opacity:c===u?1:0}},`${e.featureIdx}-${e.clipIdx}`)),s.jsx("div",{className:"mc-subtitle","aria-live":"polite",children:s.jsx(os,{mode:"wait",initial:!1,children:C&&s.jsx(I.span,{className:"mc-subtitle-text",initial:{opacity:0,y:4},animate:{opacity:1,y:0},exit:{opacity:0,y:-4},transition:{duration:x?0:.28,ease:[.16,1,.3,1]},children:C},C)})})]}),s.jsx(ds,{})]})})})})]})}function fs(){return s.jsx("svg",{width:"0",height:"0",style:{position:"absolute",pointerEvents:"none"},"aria-hidden":"true",children:s.jsxs("defs",{children:[s.jsxs("symbol",{id:"ide-iterm",viewBox:"0 0 32 32",children:[s.jsx("rect",{width:"32",height:"32",rx:"7",fill:"#1a1a1a"}),s.jsx("path",{d:"M8 11 L13 16 L8 21",fill:"none",stroke:"#fff",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round"}),s.jsx("path",{d:"M16 22 L24 22",stroke:"#fff",strokeWidth:"2.2",strokeLinecap:"round"})]}),s.jsxs("symbol",{id:"ide-chrome",viewBox:"0 0 32 32",children:[s.jsx("circle",{cx:"16",cy:"16",r:"15",fill:"#fff"}),s.jsx("path",{d:"M16 3 A13 13 0 0 1 27.26 9.5 L19.5 14 A6 6 0 0 0 11 13 Z",fill:"#EA4335"}),s.jsx("path",{d:"M27.26 9.5 A13 13 0 0 1 24.26 26.5 L19.5 18 A6 6 0 0 0 19.5 14 Z",fill:"#FBBC04"}),s.jsx("path",{d:"M24.26 26.5 A13 13 0 0 1 4.74 22.5 L12.5 18 A6 6 0 0 0 19.5 18 Z",fill:"#34A853"}),s.jsx("circle",{cx:"16",cy:"16",r:"6",fill:"#4285F4"}),s.jsx("circle",{cx:"16",cy:"16",r:"6",fill:"none",stroke:"#fff",strokeWidth:"1.5",opacity:".85"})]}),s.jsx("symbol",{id:"mb-apple",viewBox:"0 0 14 17",children:s.jsx("path",{fill:"currentColor",d:"M11.182 8.91c-.018-2.022 1.65-2.992 1.725-3.038-.94-1.376-2.404-1.564-2.925-1.586-1.247-.126-2.434.733-3.067.733-.633 0-1.61-.715-2.65-.696-1.363.02-2.62.793-3.32 2.013-1.416 2.456-.363 6.094 1.018 8.087.674.974 1.477 2.073 2.53 2.034 1.014-.04 1.397-.658 2.624-.658 1.226 0 1.572.658 2.65.638 1.094-.02 1.787-.997 2.456-1.974.774-1.13 1.093-2.224 1.112-2.28-.024-.012-2.135-.82-2.153-3.273zM9.176 2.985C9.737 2.31 10.114 1.371 10.011.434c-.806.033-1.78.537-2.36 1.21-.52.598-.974 1.553-.851 2.473.898.07 1.815-.456 2.376-1.132z"})}),s.jsxs("symbol",{id:"mb-battery",viewBox:"0 0 25 12",children:[s.jsx("rect",{x:".5",y:".5",width:"21",height:"11",rx:"2.5",fill:"none",stroke:"currentColor",strokeOpacity:".6"}),s.jsx("rect",{x:"2.5",y:"2.5",width:"14",height:"7",rx:"1",fill:"currentColor"}),s.jsx("path",{d:"M23 4v4",stroke:"currentColor",strokeOpacity:".6",strokeLinecap:"round",strokeWidth:"1.5",fill:"none"})]}),s.jsxs("symbol",{id:"mb-wifi",viewBox:"0 0 16 12",children:[s.jsxs("g",{fill:"none",stroke:"currentColor",strokeWidth:"1.3",strokeLinecap:"round",children:[s.jsx("path",{d:"M1.5 5.2A8 8 0 0 1 14.5 5.2"}),s.jsx("path",{d:"M3.8 7.4A5 5 0 0 1 12.2 7.4"}),s.jsx("path",{d:"M6 9.6A2 2 0 0 1 10 9.6"})]}),s.jsx("circle",{cx:"8",cy:"11",r:".6",fill:"currentColor"})]}),s.jsx("symbol",{id:"mb-cc",viewBox:"0 0 14 14",children:s.jsxs("g",{fill:"currentColor",children:[s.jsx("rect",{x:"1",y:"1",width:"5.5",height:"5.5",rx:"1.4",opacity:".95"}),s.jsx("rect",{x:"7.5",y:"1",width:"5.5",height:"5.5",rx:"1.4",opacity:".55"}),s.jsx("rect",{x:"1",y:"7.5",width:"5.5",height:"5.5",rx:"1.4",opacity:".55"}),s.jsx("rect",{x:"7.5",y:"7.5",width:"5.5",height:"5.5",rx:"1.4",opacity:".95"})]})}),s.jsx("symbol",{id:"mb-spotlight",viewBox:"0 0 14 14",children:s.jsxs("g",{fill:"none",stroke:"currentColor",strokeWidth:"1.4",children:[s.jsx("circle",{cx:"6",cy:"6",r:"4.4"}),s.jsx("line",{x1:"9.3",y1:"9.3",x2:"12.8",y2:"12.8",strokeLinecap:"round"})]})})]})})}const hs=`
<!-- ==========================================================
     POSITIONING
     ========================================================== -->
<section class="block" id="positioning">
  <div class="section-head reveal">
    <div class="eyebrow">Comparison</div>
    <h2 class="section-h">Odak, <span class="accent">side by side.</span></h2>
    <p class="section-sub">Different tools, different jobs. Odak is the one that treats a <em style="color:var(--accent);font-style:normal">project</em> — the folder you'd open in your editor — as a first-class thing.</p>
  </div>

  <!-- Detail comparison: feature-by-feature grid against the launchers
       a developer is most likely already using. Rows are scoped to
       project-awareness claims; we don't pretend Odak is a Raycast
       replacement (it isn't). -->
  <div class="pos-compare reveal">
    <div class="pos-compare-thead">
      <div class="h-feat">Capability</div>
      <div class="h-col us">Odak</div>
      <div class="h-col">Raycast</div>
      <div class="h-col">AltTab</div>
      <div class="h-col">Spotlight</div>
    </div>

    <div class="pos-group">Project awareness</div>

    <div class="pos-row">
      <div class="feat">Groups open windows by project</div>
      <div class="cells">
        <div class="cell us y"><span class="mk"><svg viewBox="0 0 12 12"><path d="M2.5 6.5l2.5 2.5 5-5"/></svg></span><span class="lbl">Odak</span></div>
        <div class="cell n"><span class="mk"></span><span class="lbl">Raycast</span></div>
        <div class="cell n"><span class="mk"></span><span class="lbl">AltTab</span></div>
        <div class="cell n"><span class="mk"></span><span class="lbl">Spotlight</span></div>
      </div>
    </div>

    <div class="pos-row">
      <div class="feat">Launch any project from anywhere</div>
      <div class="cells">
        <div class="cell us y"><span class="mk"><svg viewBox="0 0 12 12"><path d="M2.5 6.5l2.5 2.5 5-5"/></svg></span><span class="lbl">Odak</span></div>
        <div class="cell p"><span class="mk"></span><span class="lbl">Raycast</span></div>
        <div class="cell n"><span class="mk"></span><span class="lbl">AltTab</span></div>
        <div class="cell p"><span class="mk"></span><span class="lbl">Spotlight</span></div>
      </div>
    </div>

    <div class="pos-group">Workflow &amp; live state</div>

    <div class="pos-row">
      <div class="feat">Customizable actions per project</div>
      <div class="cells">
        <div class="cell us y"><span class="mk"><svg viewBox="0 0 12 12"><path d="M2.5 6.5l2.5 2.5 5-5"/></svg></span><span class="lbl">Odak</span></div>
        <div class="cell n"><span class="mk"></span><span class="lbl">Raycast</span></div>
        <div class="cell n"><span class="mk"></span><span class="lbl">AltTab</span></div>
        <div class="cell n"><span class="mk"></span><span class="lbl">Spotlight</span></div>
      </div>
    </div>

    <div class="pos-row">
      <div class="feat">Knows which editor each project is open in</div>
      <div class="cells">
        <div class="cell us y"><span class="mk"><svg viewBox="0 0 12 12"><path d="M2.5 6.5l2.5 2.5 5-5"/></svg></span><span class="lbl">Odak</span></div>
        <div class="cell n"><span class="mk"></span><span class="lbl">Raycast</span></div>
        <div class="cell n"><span class="mk"></span><span class="lbl">AltTab</span></div>
        <div class="cell n"><span class="mk"></span><span class="lbl">Spotlight</span></div>
      </div>
    </div>

    <div class="pos-row">
      <div class="feat">Shows git branch + status per project</div>
      <div class="cells">
        <div class="cell us y"><span class="mk"><svg viewBox="0 0 12 12"><path d="M2.5 6.5l2.5 2.5 5-5"/></svg></span><span class="lbl">Odak</span></div>
        <div class="cell p"><span class="mk"></span><span class="lbl">Raycast</span></div>
        <div class="cell n"><span class="mk"></span><span class="lbl">AltTab</span></div>
        <div class="cell n"><span class="mk"></span><span class="lbl">Spotlight</span></div>
      </div>
    </div>

    <div class="pos-row">
      <div class="feat">Active project always visible in the menu bar</div>
      <div class="cells">
        <div class="cell us y"><span class="mk"><svg viewBox="0 0 12 12"><path d="M2.5 6.5l2.5 2.5 5-5"/></svg></span><span class="lbl">Odak</span></div>
        <div class="cell n"><span class="mk"></span><span class="lbl">Raycast</span></div>
        <div class="cell n"><span class="mk"></span><span class="lbl">AltTab</span></div>
        <div class="cell n"><span class="mk"></span><span class="lbl">Spotlight</span></div>
      </div>
    </div>

    <div class="pos-group">License &amp; runtime</div>

    <div class="pos-row">
      <div class="feat">Works fully offline, no sign-in</div>
      <div class="cells">
        <div class="cell us y"><span class="mk"><svg viewBox="0 0 12 12"><path d="M2.5 6.5l2.5 2.5 5-5"/></svg></span><span class="lbl">Odak</span></div>
        <div class="cell p"><span class="mk"></span><span class="lbl">Raycast</span></div>
        <div class="cell y"><span class="mk"><svg viewBox="0 0 12 12"><path d="M2.5 6.5l2.5 2.5 5-5"/></svg></span><span class="lbl">AltTab</span></div>
        <div class="cell y"><span class="mk"><svg viewBox="0 0 12 12"><path d="M2.5 6.5l2.5 2.5 5-5"/></svg></span><span class="lbl">Spotlight</span></div>
      </div>
    </div>

    <div class="pos-row">
      <div class="feat">One-time price, no subscription</div>
      <div class="cells">
        <div class="cell us y"><span class="mk"><svg viewBox="0 0 12 12"><path d="M2.5 6.5l2.5 2.5 5-5"/></svg></span><span class="lbl">Odak</span></div>
        <div class="cell n"><span class="mk"></span><span class="lbl">Raycast</span></div>
        <div class="cell y"><span class="mk"><svg viewBox="0 0 12 12"><path d="M2.5 6.5l2.5 2.5 5-5"/></svg></span><span class="lbl">AltTab</span></div>
        <div class="cell y"><span class="mk"><svg viewBox="0 0 12 12"><path d="M2.5 6.5l2.5 2.5 5-5"/></svg></span><span class="lbl">Spotlight</span></div>
      </div>
    </div>

    <div class="pos-compare-foot">
      <span class="lg y"><span class="mk"></span>Yes</span>
      <span class="lg p"><span class="mk"></span>Partial / via extension</span>
      <span class="lg n"><span class="mk"></span>No</span>
    </div>
  </div>
</section>

<!-- ==========================================================
     PRICING
     ========================================================== -->
<section class="block" id="pricing">
  <div class="section-head reveal">
    <div class="eyebrow">Pricing</div>
    <h2 class="section-h">$19. Once. <span class="accent">Yours.</span></h2>
    <p class="section-sub">No seats, no subscription, no usage tiers. Pay once, keep it forever.</p>
  </div>

  <div class="pricing">
    <div class="price-card reveal">
      <div class="head-row">
        <div class="trial-badge">14 days free</div>
      </div>
      <div class="amount">
        <span class="curr">$</span>19<span class="per">once</span>
      </div>
      <div class="amount-sub">3 Macs · lifetime license</div>
      <ul>
        <li><svg viewBox="0 0 16 16"><path d="M3 8l3 3 7-7"/></svg><span><b>Every feature, unlocked.</b> No pro tier, no add-ons.</span></li>
        <li><svg viewBox="0 0 16 16"><path d="M3 8l3 3 7-7"/></svg><span>Use on <b>3 Macs</b> — desktop, laptop, work machine.</span></li>
        <li><svg viewBox="0 0 16 16"><path d="M3 8l3 3 7-7"/></svg><span><b>Lifetime license.</b> Bug fixes, security patches, and new features — free.</span></li>
        <li><svg viewBox="0 0 16 16"><path d="M3 8l3 3 7-7"/></svg><span>14-day free trial. No credit card.</span></li>
      </ul>
      <div class="buy-row">
        <a href="/buy" class="buy">Buy Odak — $19</a>
        <a href="https://github.com/salihcaan/odak.fyi/releases/latest/download/Odak.dmg" class="btn-link">Try free for 14 days <span class="arrow" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M3 6h6m-3-3l3 3-3 3"/></svg></span></a>
      </div>
      <p class="price-fine">One-time payment · instant activation · Sparkle auto-updates · <a href="/refund.html">14-day refund</a></p>
    </div>

    <div class="price-aside reveal">
      <h3>Pays for itself <span class="accent">in a week.</span></h3>
      <p class="lead">Save a few seconds finding the right window, dozens of times a day. It adds up faster than the price tag.</p>
      <p>A tool that earns its place on the keyboard shouldn't have to re-earn it every month.</p>
      <div class="seals">
        <span class="seal">Hardened runtime</span>
        <span class="seal">Apple Silicon</span>
        <span class="seal">Telemetry off by default</span>
      </div>
    </div>
  </div>
</section>

<!-- ==========================================================
     FAQ
     ========================================================== -->
<section class="block" id="faq">
  <div class="section-head reveal">
    <div class="eyebrow">FAQ</div>
    <h2 class="section-h">Quick <span class="accent">answers.</span></h2>
  </div>

  <div class="faq-grid">
    <details class="faq-item reveal" open>
      <summary><span class="q">Will this run on my Mac?</span><span class="ic" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M6 2v8M2 6h8"/></svg></span></summary>
      <p>macOS 26 Tahoe or later, Apple Silicon only. The Liquid Glass UI uses macOS 26 APIs that don't backport, and Tahoe dropped Intel — so neither does Odak.</p>
    </details>

    <details class="faq-item reveal">
      <summary><span class="q">I already use Raycast — why this?</span><span class="ic" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M6 2v8M2 6h8"/></svg></span></summary>
      <p>Raycast knows apps and commands; Odak knows projects (which editors have them open, what each one wants you to do next). Use them side by side.</p>
    </details>

    <details class="faq-item reveal">
      <summary><span class="q">Which editors does it support?</span><span class="ic" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M6 2v8M2 6h8"/></svg></span></summary>
      <p>Cursor, VS Code, IntelliJ IDEA, and GoLand out of the box. Xcode and anything else via Settings — pick the .app and Odak grabs the bundle ID for you.</p>
    </details>

    <details class="faq-item reveal">
      <summary><span class="q">What goes in <code>.odak</code> vs <code>~/.odak/config.yaml</code>?</span><span class="ic" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M6 2v8M2 6h8"/></svg></span></summary>
      <p>The <code>.odak</code> file in a project is tiny — just the IDE to use and a few variables. Your actions live globally in <code>~/.odak/config.yaml</code>; write them once, they apply everywhere. <a href="/docs/actions.html">Read the full reference →</a></p>
    </details>

    <details class="faq-item reveal">
      <summary><span class="q">What does Odak send back?</span><span class="ic" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M6 2v8M2 6h8"/></svg></span></summary>
      <p>By default, <strong>nothing</strong> — projects, queries, and settings never leave your Mac. If you opt in, Odak shares anonymous events and crash reports (no email, no IP, no project names, no window titles). <a href="/privacy.html#app">Full details →</a></p>
    </details>

    <details class="faq-item reveal">
      <summary><span class="q">What happens after the 14-day trial?</span><span class="ic" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M6 2v8M2 6h8"/></svg></span></summary>
      <p>Every feature is unlocked during the trial. After 14 days, buy it for $19 (one time) or stop using it. No card up front, no cancellation flow.</p>
    </details>

    <details class="faq-item reveal">
      <summary><span class="q">Refunds?</span><span class="ic" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M6 2v8M2 6h8"/></svg></span></summary>
      <p>14 days, no questions. Email <a href="mailto:support@odak.fyi">support@odak.fyi</a>.</p>
    </details>
  </div>
</section>

<!-- FOOTER lives in <Footer /> (app/components/site/Footer.tsx) -->

<div class="grain"></div>

`;function us(){const a=$();n.useEffect(()=>{const t=document.createElement("script");return t.src="/legacy/index-runtime.js",t.defer=!0,document.body.appendChild(t),()=>{t.remove()}},[]);const o=t=>a?{initial:{opacity:0},animate:{opacity:1},transition:{duration:.2}}:{initial:{opacity:0,y:14},animate:{opacity:1,y:0},transition:{duration:.7,delay:t,ease:[.16,1,.3,1]}};return s.jsxs(s.Fragment,{children:[s.jsx(fs,{}),s.jsx(X,{}),s.jsx("div",{className:"grid-bg"}),s.jsx(K,{showBuy:!0,hashHrefs:!0}),s.jsxs("div",{className:"hero-stage-combined",children:[s.jsx("div",{className:"stage-grid","aria-hidden":"true"}),s.jsx("section",{className:"hero",id:"hero",style:{position:"relative"},children:s.jsxs("div",{className:"hero-text",children:[s.jsxs(I.h1,{className:"hero-h",...o(0),children:["Any project",s.jsx("br",{}),s.jsx("span",{className:"accent",children:"Two keys."})]}),s.jsx(I.p,{className:"hero-sub",...o(.18),children:"Press ⌥ Space, type three letters, hit ↵. Odak brings the right window into focus — even across ten Cursor windows."}),s.jsxs(I.div,{className:"hero-cta",...o(.27),children:[s.jsxs("a",{href:"https://github.com/salihcaan/odak.fyi/releases/latest/download/Odak.dmg",className:"btn-primary",children:["Try free for 14 days ",s.jsx("span",{className:"k",children:"⌘ + D"})]}),s.jsxs("button",{className:"btn-link down",onClick:()=>{var t;return(t=document.getElementById("features"))==null?void 0:t.scrollIntoView({behavior:"smooth"})},children:["See how it works",s.jsx("span",{className:"arrow","aria-hidden":"true",children:s.jsx("svg",{viewBox:"0 0 12 12",children:s.jsx("path",{d:"M6 3v6m-3-3l3 3 3-3"})})})]})]}),s.jsxs(I.div,{className:"hero-fine",...o(.36),children:[s.jsx("span",{children:"14-day trial · no card"}),s.jsx("span",{className:"dot"}),s.jsx("span",{children:"macOS 26+ · Apple Silicon"})]})]})}),s.jsx(ps,{})]}),s.jsx("div",{dangerouslySetInnerHTML:{__html:hs}}),s.jsx(J,{})]})}Q(document.getElementById("root")).render(s.jsx(us,{}));
