function Clock(){let e=new Date;let t=e.getTimezoneOffset();let s=t>0?"-":"+";let n=Math.abs(Math.floor(t/60));this.hour=e.getHours();this.minute=e.getMinutes();this.second=e.getSeconds();this.period=this.hour<12?'"AM"':'"PM"';this.day=e.getDate();this.weekday=en_week_days_name[e.getDay()];this.month=en_month_name[e.getMonth()];this.year=e.getFullYear();this.timezone=`"GMT${s}${n.toString().padStart(2,"0")}"`;this.unix=Math.floor(Date.now()/1e3);this.utc=`"${new Date(this.unix*1e3).toISOString()}"`}function Settings(){this.clock={elements:{hour:{order:0,visibility:true,type:"number"},minute:{order:1,visibility:true,type:"number"},second:{order:2,visibility:true,type:"number"},period:{order:3,visibility:true,type:"string"},day:{order:4,visibility:true,type:"number"},weekday:{order:5,visibility:false,type:"string"},month:{order:6,visibility:true,type:"string"},year:{order:7,visibility:true,type:"number"},timezone:{order:8,visibility:false,type:"string"},unix:{order:9,visibility:false,type:"number"},utc:{order:10,visibility:false,type:"string"}}};this.format={use_12h_format:false,show_leading_zero:false,use_const_declaration:false};this.visibility={customization:{enable:false}};this.position={customization:{enable:false},x:"center",y:"center"};this.theme={customization:{enable:false},name:"dark-modern"};this.font={size:32,family:"inherit"}}const changeable_format_elements=["hour","minute","second","day"];const possible_declarations=["let","const"];const en_month_name=['"January"','"February"','"March"','"April"','"May"','"June"','"July"','"August"','"September"','"October"','"November"','"December"'];const en_week_days_name=['"Sunday"','"Monday"','"Tuesday"','"Wednesday"','"Thursday"','"Friday"','"Saturday"'];const themes={main:"./styles/main.css",jb_dark:"./styles/jb-dark.css",jb_light:"./styles/jb-light.css",dark_modern:"./styles/dark-modern.css",light_modern:"./styles/light-modern.css",one_dark_pro:"./styles/one-dark-pro.css",dracula_official:"./styles/dracula-official.css",github_theme:"./styles/github-theme.css",code_time:"./styles/code-time.css",rose_pine:"./styles/rose-pine.css",catppuccin_mocha:"./styles/catppuccin-mocha.css",synthwave_84:"./styles/synthwave-84.css"};const default_settings=new Settings;function convertTo12hFormat(e){e%=12;if(e===0){return 12}return e}function use12hFormat(e,t){if(e){t["hour"]=convertTo12hFormat(t["hour"])}}function addLeadingZero(e){if(e<10){return`"${e.toString().padStart(2,"0")}"`}return`"${e}"`}function showLeadingZero(e,t,s){if(e){changeable_format_elements.map(e=>{t[e]=addLeadingZero(t[e]);if(s[e].type!=="string"){s[e].type="string"}})}else{changeable_format_elements.map(e=>{if(s[e].type!=="number"){s[e].type="number"}})}}function getVisibleElementsOrderedList(e){const s=Object.entries(e);let n=[];for(let t=0;t<s.length;t++){for(let e=0;e<s.length;e++){if(t===s[e][1].order&&s[e][1].visibility){n.push(s[e][0])}}}return n}function createClockElement(e,t,s,n=true){const i=document.createElement("p");i.id=e;i.classList.add("tab");i.innerHTML=`<span class="object-key">${e}</span><span class="colon">:</span> <span id="${e}_value" class="${s[e].type}">${t[e].toString()}</span><span class="comma">,</span>`;if(!n){i.getElementsByClassName("comma")[0].remove()}return i}function createClockElements(t,s,e){const n=e.slice(-1)[0];let i=[];e.map(e=>{if(e!==n){i.push(createClockElement(e,t,s))}else{i.push(createClockElement(e,t,s,false))}});return i}function createClock(e,t){const s=[];const n=t.format.use_const_declaration?possible_declarations[1]:possible_declarations[0];const i=document.createElement("p");i.innerHTML=`<span class="keyword">${n}</span> <span class="local-variable">clock</span> <span class="operator">=</span> <span class="bracket">{</span>`;s.push(i);const o=t.visibility.customization.enable?t.clock.elements:default_settings.clock.elements;use12hFormat(t.format.use_12h_format,e);showLeadingZero(t.format.show_leading_zero,e,o);const a=getVisibleElementsOrderedList(o);const r=createClockElements(e,o,a);s.push(...r);const c=document.createElement("p");c.innerHTML=`<span class="bracket">}</span><span class="semicolon">;</span>`;s.push(c);return s}function updateClockDOM(e,t){document.getElementById("object_clock").replaceChildren(...createClock(e,t))}function changePosition(e){const t=e.position.customization.enable?e.position:default_settings.position;const s=t.x;const n=t.y;document.body.style.justifyContent=s;document.body.style.alignItems=n}function changeFontSize({size:e}){document.body.style.fontSize=e+"px"}function changeFontFamily({family:e}){document.body.style.fontFamily=e}function changeTheme(e){const t=e.theme;const s=t.customization.enable?e.font:default_settings.font;changeFontFamily(s);const n=document.querySelectorAll("link")[1];if(n.getAttribute("href")!==themes[t.name]){n.setAttribute("href",themes[t.name])}}function updateClock(e,t){e=new Clock;changeFontSize(t.font);changePosition(t);changeTheme(t);updateClockDOM(e,t)}export{Clock,Settings,updateClock};