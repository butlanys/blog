"use strict";const cheerio=require("cheerio");function insertTopImg(e){let t=e("#page-header");if(t.length===0)return;let r=t.css("background-image");if(!r)return;e("#post, #page, #archive, #tag, #category").prepend(`<div class="top-img" style="background-image: ${r};"></div>`)}hexo.extend.filter.register("after_render:html",function(e,t){let r=cheerio.load(e,{decodeEntities:false});insertTopImg(r);return r.html()});