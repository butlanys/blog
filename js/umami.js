function cachedData(t){const e=t||"default-cache";return{cache:function(t,a){if(!e){throw new Error("Cache name is required")}else{localStorage.setItem(`${e}-${t}`,JSON.stringify(a))}},get:function(t){const a=localStorage.getItem(`${e}-${t}`);return a?JSON.parse(a):null},clear:function(t){localStorage.removeItem(`${e}-${t}`)},has:function(t){return localStorage.getItem(`${e}-${t}`)!==null}}}async function getToken(){const t="换成你获取 token 的地址";try{const a=await fetch(t);if(!a.ok){throw new Error("Network response was not ok")}const e=await a.json();return e.token}catch(t){console.error("Error fetching token:",t)}}async function getData(t){const a=new Date;const e=new Date(a);e.setHours(23,59,59,999);const n=new Date(a);n.setDate(a.getDate()-30);n.setHours(0,0,0,0);const s=n.getTime();const i=e.getTime();const o=`https://你的umami域名/api/websites/你的网站ID/getWebsiteMetrics?startAt=${s}&endAt=${i}&unit=hour&timezone=Asia%2FShanghai&compare=false&limit=5&type=os`;try{const c=await fetch(o,{method:"GET",headers:{"Content-Type":"application/json","X-Umami-Share-Token":t}});if(!c.ok){throw new Error("Network response was not ok")}const r=await c.json();return r}catch(t){console.error("Error fetching data:",t)}}(async()=>{let t,a;const e=o("umami");const n=Date.now();const s=4*60*60*1e3;const i=await e.get("token");const o=await e.get("data");if(!i||n>parseInt(i.cacheTime,10)+s){t=await getToken();await e.cache("token",{cacheTime:n,token:t})}else{t=i.token}if(!o||n>parseInt(o.cacheTime,10)+s){a=await getData(t);await e.cache("data",{cacheTime:n,data:a})}else{a=o.data}const c=document.getElementById("stats");const r=document.getElementById("metrics");const l=a.stats.pageviews.value;const d=a.stats.visitors.value;const m=a.stats.visits.value;const p=a.country.map(t=>{return`
    <div class="list">
    <div class="item">
        <img class="loading nolazyload" alt="${t.x}" width="16" height="16" src="${t.icon}"></img>
        <span class="name">${t.name}</span>
    </div>
    <div class="value">${t.y}</div>
    </div>`}).join("");const v=a.browser.map(t=>{return`
    <div class="list">
    <div class="item">
        <img class="loading nolazyload" alt="${t.x}" width="16" height="16" src="${t.icon}"></img>
        <span class="name">${t.name}</span>
    </div>
    <div class="value">${t.y}</div>
    </div>`}).join("");const g=a.os.map(t=>{return`
    <div class="list">
    <div class="item">
        <img class="loading nolazyload" alt="${t.x}" width="16" height="16" src="${t.icon}"></img>
        <span class="name">${t.name}</span>
    </div>
    <div class="value">${t.y}</div>
    </div>`}).join("");if(c&&r){c.innerHTML+=`<div><span>浏览量</span><span>${l}</span></div>`;c.innerHTML+=`<div><span>访问次数</span><span>${d}</span></div>`;c.innerHTML+=`<div><span>访客</span><span>${m}</span></div>`;r.innerHTML+=`
    <div class="country"><span>访客国家/地区 (TOP5)</span>${p}</div>
    <div class="os"><span>访客操作系统 (TOP5)</span>${g}</div>
    <div class="browser"><span>访客浏览器 (TOP5)</span>${v}</div>`;if(window.lazyLoadInstance)window.lazyLoadInstance.update()}})();