// 从URL获取路径，例如 https://example.com/music/playlist?path=/my/music/folder
const urlParams = new URLSearchParams(window.location.search);
const path = urlParams.get('path') || '/music'; // 默认路径为 /music

// 使用 Fetch API 获取音乐列表
fetch(`https://alist.hqycloud.top/api/fs/list`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    path: path,
    password: '', // 替换为你的密码
    page: 1,
    per_page: 100,
    refresh: false
  })
})
  .then(response => response.json())
  .then(data => {
    if (data.code === 200) {
      // 提取音乐信息并创建 APlayer 播放列表
      const audioList = data.data.content
        .filter(item => !item.is_dir) // 过滤掉文件夹
        .map(item => ({
          name: item.name.replace(/\.[^/.]+$/, ""), // 去除文件扩展名
          url: `https://alist.hqycloud.top/d/onedrive-data${path}/${encodeURIComponent(item.name)}`, // 构造直链
          cover: item.thumb // 可选：设置封面图片
        }));

      // 创建 APlayer 实例
      const ap = new APlayer({
        container: document.getElementById('aplayer'),
        fixed: true,
        autoplay: false,
        order: random
        audio: audioList
      });
    } else {
      console.error('获取音乐列表失败:', data.message);
      // 处理错误，例如显示错误信息
    }
  })
  .catch(error => {
    console.error('获取音乐列表出错:', error);
    // 处理网络错误
  });