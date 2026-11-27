(function(){
const D=window.AJ,css=getComputedStyle(document.documentElement);
const st=document.createElement('style');st.textContent=`
#ck{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);width:min(440px,calc(100vw - 24px));z-index:20;font:15px/1.5 'Courier Prime',monospace}
#ck .box{background:var(--card,#fff);color:var(--ink,#111);border:1px solid var(--line,#ddd);border-radius:2px;box-shadow:0 10px 30px rgba(40,25,5,.35),0 0 0 3px rgba(232,213,163,.6);border-color:var(--ink,#111);font-family:'Special Elite','Courier Prime',monospace;overflow:hidden}
#ck .log{display:none;max-height:300px;overflow:auto;padding:14px}
#ck.open .log{display:block}
#ck .m{margin:0 0 10px;font-size:14px}#ck .u{text-align:right;color:var(--mute,#777)}
#ck .a{color:var(--ink,#111)}#ck a{color:var(--acc,var(--g,#f60))}#ck .a b{color:var(--acc,var(--g,#f60))}
#ck .sg{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}
#ck .sg button{font:inherit;font-size:12px;border:1px solid var(--line,#ddd);background:none;color:var(--ink,#111);border-radius:2px;padding:4px 10px;cursor:pointer}
#ck .sg button:hover{border-color:var(--acc,var(--g,#f60))}
#ck form{display:flex;align-items:center;gap:8px;padding:10px 12px;border-top:1px solid transparent}
#ck.open form{border-top-color:var(--line,#ddd)}
#ck input{flex:1;background:none;border:0;outline:0;color:inherit;font:inherit;font-size:14px;min-width:0}
#ck kbd{font-size:11px;color:var(--mute,#777);border:1px solid var(--line,#ddd);border-radius:5px;padding:1px 6px}
#ck button.s{width:30px;height:30px;border-radius:2px;border:0;background:var(--ink,#111);color:var(--bg,#fff);cursor:pointer}
@media(max-width:640px){#ck kbd{display:none}}`;document.head.append(st);
const el=document.createElement('div');el.id='ck';el.innerHTML=`<div class=box><div class=log id=cl aria-live=polite></div><form id=cf><input id=ci placeholder="Ask about me, work or send a message!" aria-label="Ask about Ajay" maxlength=300><kbd>\u2318 K</kbd><button class=s aria-label=Send>\u2191</button></form></div>`;document.body.append(el);
const log=el.querySelector('#cl'),inp=el.querySelector('#ci');
const add=(c,h)=>{const p=document.createElement('p');p.className='m '+c;p.innerHTML=h;log.append(p);el.classList.add('open');log.scrollTop=1e9;return p};
const esc=s=>s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
function local(q){q=q.toLowerCase();const P=D.projects;
const hit=P.find(p=>q.includes(p.n.toLowerCase()));
if(hit)return `<b>${hit.n}</b>: ${hit.d} <a href="${hit.u}" target=_blank rel=noopener>Open</a>`;
if(/project|built|build|work/.test(q))return 'He has built '+P.map(p=>`<b>${p.n}</b>`).join(', ')+'. Ask about any one of them.';
if(/open ?source|pr|merge|meshery|github/.test(q))return D.oss.text;
if(/paper|research|maicm|publish/.test(q))return `${D.paper.t}. ${D.paper.v}`;
if(/youtube|video|content/.test(q))return 'He makes tech videos on YouTube, mostly about AI tools and how to set them up.';
if(/club|aitsc|founder|lead|gyaan/.test(q))return D.club;
if(/college|study|student|education|btech|b\.tech/.test(q))return D.about;
if(/where|live|city|gwalior/.test(q))return 'Gwalior, India.';
if(/contact|email|hire|intern|reach|message|hi\b|hello/.test(q))return 'Best way is email: <a href="mailto:hey@ajaymathuriya.com">hey@ajaymathuriya.com</a>. Or find him on <a href="https://www.linkedin.com/in/ajaymathuriya" target=_blank rel=noopener>LinkedIn</a>.';
if(/who|about|ajay/.test(q))return D.tag;
return 'I only know what is on this page. Try asking about his projects, open source, paper, or how to contact him.'}
async function ask(q){add('u',esc(q));const w=add('a','...');
let out=null;try{const r=await fetch('/api/chat',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({q})});if(r.ok){const j=await r.json();if(j.a)out=esc(j.a)}}catch(e){}
w.innerHTML=out||local(q)}
el.querySelector('#cf').onsubmit=e=>{e.preventDefault();const q=inp.value.trim();if(q){inp.value='';ask(q)}};
inp.addEventListener('focus',()=>{if(!log.children.length){add('a','Hi, I answer questions about Ajay. <div class=sg>'+['Projects','Open source','Contact'].map(s=>`<button type=button>${s}</button>`).join('')+'</div>');log.querySelectorAll('.sg button').forEach(b=>b.onclick=()=>ask(b.textContent))}});
addEventListener('keydown',e=>{if(((e.key==='k'&&(e.metaKey||e.ctrlKey))||(e.key==='/'&&document.activeElement.tagName!=='INPUT'))&&!(e.key==='/'&&document.activeElement.tagName==='TEXTAREA')){e.preventDefault();inp.focus()}if(e.key==='Escape'){el.classList.remove('open');inp.blur()}});
})();
