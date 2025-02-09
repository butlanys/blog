function cachedData(a){const e=a||"default-cache";return{cache:function(a,t){if(!e){throw new Error("Cache name is required")}else{localStorage.setItem(`${e}-${a}`,JSON.stringify(t))}},get:function(a){const t=localStorage.getItem(`${e}-${a}`);return t?JSON.parse(t):null},clear:function(a){localStorage.removeItem(`${e}-${a}`)},has:function(a){return localStorage.getItem(`${e}-${a}`)!==null}}}async function getToken(){const a="换成你获取 token 的地址";try{const t=await fetch(a);if(!t.ok){throw new Error("Network response was not ok")}const e=await t.json();return e.token}catch(a){console.error("Error fetching token:",a)}}async function getData(a){const t=new Date;const e=new Date(t);e.setHours(23,59,59,999);const n=new Date(t);n.setDate(t.getDate()-30);n.setHours(0,0,0,0);const s=n.getTime();const i=e.getTime();const o=`https://你的umami域名/api/websites/你的网站ID/getWebsiteMetrics?startAt=${s}&endAt=${i}&unit=hour&timezone=Asia%2FShanghai&compare=false&limit=5&type=os`;try{const c=await fetch(o,{method:"GET",headers:{"Content-Type":"application/json","X-Umami-Share-Token":a}});if(!c.ok){throw new Error("Network response was not ok")}const r=await c.json();return r}catch(a){console.error("Error fetching data:",a)}}(async()=>{let a,t;const e=cachedData("umami");const n=Date.now();const s=4*60*60*1e3;const i=await e.get("token");const o=await e.get("data");if(!i||n>parseInt(i.cacheTime,10)+s){a=await getToken();await e.cache("token",{cacheTime:n,token:a})}else{a=i.token}if(!o||n>parseInt(o.cacheTime,10)+s){t=await getData(a);await e.cache("data",{cacheTime:n,data:t})}else{t=o.data}const c=document.getElementById("stats");const r=document.getElementById("metrics");const l=t.stats.pageviews.value;const d=t.stats.visitors.value;const m=t.stats.visits.value;const p=t.country.map(a=>{return`
    <div class="list">
    <div class="item">
        <img class="loading nolazyload" alt="${a.x}" width="16" height="16" src="${a.icon}"></img>
        <span class="name">${a.name}</span>
    </div>
    <div class="value">${a.y}</div>
    </div>`}).join("");const v=t.browser.map(a=>{return`
    <div class="list">
    <div class="item">
        <img class="loading nolazyload" alt="${a.x}" width="16" height="16" src="${a.icon}"></img>
        <span class="name">${a.name}</span>
    </div>
    <div class="value">${a.y}</div>
    </div>`}).join("");const h=t.os.map(a=>{return`
    <div class="list">
    <div class="item">
        <img class="loading nolazyload" alt="${a.x}" width="16" height="16" src="${a.icon}"></img>
        <span class="name">${a.name}</span>
    </div>
    <div class="value">${a.y}</div>
    </div>`}).join("");if(c&&r){c.innerHTML+=`<div><span>浏览量</span><span>${l}</span></div>`;c.innerHTML+=`<div><span>访问次数</span><span>${d}</span></div>`;c.innerHTML+=`<div><span>访客</span><span>${m}</span></div>`;r.innerHTML+=`
    <div class="country"><span>访客国家/地区 (TOP5)</span>${p}</div>
    <div class="os"><span>访客操作系统 (TOP5)</span>${h}</div>
    <div class="browser"><span>访客浏览器 (TOP5)</span>${v}</div>`;if(window.lazyLoadInstance)window.lazyLoadInstance.update()}})();