import { app, BrowserWindow, ipcMain, dialog } from 'electron'
// import '../renderer/store'
const cache = require('./cache');
const fs = require('./cache/plugins');
const ip = require('ip');
const IP = ip.address();
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
}

let mainWindow = null;
// let child
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#/chat`
  : `file://${__dirname}/index.html`
function createWindow() {
  mainWindow = new BrowserWindow({
    height: 590,
    useContentSize: true,
    width: 850,
    show: false,
    center: true,
    resizable: false,
    frame: false
  });
  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  mainWindow.once('ready-to-show', () => { //渲染进程第一渲染完成触发，防止白屏
    mainWindow.show();
  });
  mainWindow.setProgressBar(0.5);
  mainWindow.once('focus', () => mainWindow.flashFrame(false))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
// 自定义用户与native交互事件
ipcMain.on('closeClient', (e, args) => {
  console.log(args) // print 0
  app.quit()
})

ipcMain.on('minClient', e => {
  mainWindow.minimize();
  e.sender.send('minimize', {ip: IP});
});

ipcMain.on('flashFrame', () => {
  mainWindow.flashFrame(true);
});

ipcMain.on('showWin', () => {
  mainWindow.show();
});

ipcMain.on('reload', (e, args) => {
  mainWindow.reload();
});

ipcMain.on('getIp', (e, args) => {
  e.sender.send('getIp', {ip: IP});
});

let cacheObjct = null;
ipcMain.on('initCache', (e, args) => {
  const path = process.env.NODE_ENV === 'development' ? 'userData' : require('path').join(__dirname, '../../../myAppCache').replace(/\\/g, '\\\\');
  console.log(process.env.NODE_ENV, 'env')
  fs.checkFile(path, process.env.NODE_ENV === 'development');
  cacheObjct = new cache(args);
});

ipcMain.on('dealCache', (event, args) => {
  const { type, key, data } = args;
  switch (type) {
    case 1: // 获取缓存数据
      const resp = cacheObjct.getCacheByKey(key);
      // event.reply('dealCacheResp', data); 这种方式不行？why
      event.sender.send('dealCacheResp', { key, data: resp });
      break;
    case 2: // 设置缓存
      cacheObjct.setCache(key, data);
      event.sender.send('isWinMin', mainWindow.isMinimized());
      break;
    case 3: // 删除缓存
      cacheObjct.removeCacheBykey(key);
      break;
    case 4: // 清空本地缓存
      cacheObjct.clear();
      break;
  };
})
