// Anonymous first-party measurements: no cookies, IP addresses or form data.
// Counts browser visits from installation onward, not historical traffic.
(()=>{
 if(!['durobalrabia.netlify.app','durobalarabia.com','www.durobalarabia.com'].includes(location.hostname))return;
 if(location.pathname.startsWith('/admin')||navigator.webdriver||navigator.globalPrivacyControl||navigator.doNotTrack==='1')return;
 let visitor,visit;
 try{visitor=localStorage.getItem('durob-visitor');if(!/^[0-9a-f-]{36}$/.test(visitor||'')){visitor=crypto.randomUUID();localStorage.setItem('durob-visitor',visitor);}visit=crypto.randomUUID();}catch{return;}
 const page=location.pathname==='/index.html'?'/':location.pathname;
 let ref='';try{const u=new URL(document.referrer);if(u.origin!==location.origin)ref=u.host.slice(0,160);}catch{}
 const send=()=>{
  if(document.visibilityState!=='visible')return;
  fetch(PUBLIC_SUPABASE_URL+'/rest/v1/rpc/track_visit',{method:'POST',headers:{apikey:PUBLIC_SUPABASE_KEY,'Content-Type':'application/json'},body:JSON.stringify({visit,visitor,page,lang:document.documentElement.lang==='tr'?'tr':'ar',ref}),keepalive:true}).catch(()=>{});
 };
 send();setInterval(send,30000);document.addEventListener('visibilitychange',send);
})();
