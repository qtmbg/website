(() => {
 'use strict';
 const fr=document.documentElement.lang==='fr';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const timeNode=document.querySelector('.menu-time');
 const clockLabel=document.querySelector('#clock-accessible');
 const weekday=document.querySelector('.calendar-weekday');
 const calendarDay=document.querySelector('.calendar-day');
 const grid=document.querySelector('.mini-calendar');
 let dateKey='';
 function updateTime(){
   const now=new Date();
   const options={timeZone:'Africa/Casablanca'};
   if(timeNode){timeNode.dateTime=now.toISOString();timeNode.textContent=new Intl.DateTimeFormat(fr?'fr-FR':'en-US',{...options,weekday:'short',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}).format(now);}
   const parts=new Intl.DateTimeFormat('en-GB',{...options,hour:'numeric',minute:'numeric',second:'numeric',hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric'}).formatToParts(now);
   const p=Object.fromEntries(parts.map(v=>[v.type,v.value]));
   const h=Number(p.hour),m=Number(p.minute),s=Number(p.second);
   for(const [name,angle] of [['hour',h*30+m*.5],['minute',m*6+s*.1],['second',s*6]]){const hand=document.querySelector('.'+name+'-hand');if(hand)hand.style.transform='rotate('+angle+'deg)';}
   if(clockLabel)clockLabel.textContent=new Intl.DateTimeFormat(fr?'fr-FR':'en-GB',{...options,hour:'2-digit',minute:'2-digit'}).format(now)+' · Casablanca';
   const key=p.year+'-'+p.month+'-'+p.day;
   if(grid&&key!==dateKey){
     dateKey=key;weekday.textContent=new Intl.DateTimeFormat(fr?'fr-FR':'en-US',{...options,weekday:'long'}).format(now);calendarDay.textContent=String(Number(p.day));
     grid.replaceChildren();for(const name of (fr?['D','L','M','M','J','V','S']:['S','M','T','W','T','F','S'])){let el=document.createElement('b');el.textContent=name;grid.append(el);}
     const start=new Date(Number(p.year),Number(p.month)-1,1).getDay();const days=new Date(Number(p.year),Number(p.month),0).getDate();
     for(let i=0;i<start;i++)grid.append(document.createElement('span'));
     for(let i=1;i<=days;i++){let el=document.createElement('span');el.textContent=i;if(i===Number(p.day))el.className='current';grid.append(el);}
   }
 }
 updateTime();let timer=setInterval(updateTime,1000);
 document.addEventListener('visibilitychange',()=>{clearInterval(timer);if(!document.hidden){updateTime();timer=setInterval(updateTime,1000);}});
 const normal=location.pathname.replace(/\/$/,'')||'/';
 for(const link of document.querySelectorAll('.dock-item,.site-header nav a')){if((new URL(link.href).pathname.replace(/\/$/,'')||'/')===normal)link.setAttribute('aria-current','page');}
 if(!reduced.matches){
   const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}},{threshold:.12});
   document.querySelectorAll('.desktop-section').forEach(el=>observer.observe(el));
 }
 // Only the clock's title handle is draggable; navigation remains native.
 const widget=document.querySelector('[data-draggable]');const handle=widget?.querySelector('.widget-handle');
 if(handle){let start=null;handle.addEventListener('pointerdown',event=>{if(event.button!==0||innerWidth<1001)return;event.preventDefault();const r=widget.getBoundingClientRect();const stage=widget.parentElement.getBoundingClientRect();start={x:event.clientX,y:event.clientY,left:r.left-stage.left,top:r.top-stage.top};handle.setPointerCapture(event.pointerId);widget.style.animation='none';handle.style.cursor='grabbing';});
 handle.addEventListener('pointermove',event=>{if(!start)return;const parent=widget.parentElement;const x=Math.max(8,Math.min(parent.clientWidth-widget.offsetWidth-8,start.left+event.clientX-start.x));const y=Math.max(8,Math.min(parent.clientHeight-widget.offsetHeight-8,start.top+event.clientY-start.y));widget.style.left=x+'px';widget.style.top=y+'px';});
 const end=()=>{start=null;handle.style.cursor='grab';};handle.addEventListener('pointerup',end);handle.addEventListener('pointercancel',end);addEventListener('resize',()=>{widget.style.left='';widget.style.top='';});}
})();
