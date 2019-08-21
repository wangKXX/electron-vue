import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import '../renderer/store'
const cache = require('./cache');
const fs = require('./cache/plugins')
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
// let child
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#/chat`
  : `file://${__dirname}/index.html`
function createWindow () {
  mainWindow = new BrowserWindow({
    height: 590,
    useContentSize: true,
    width: 850,
    show: false,
    center: true,
    resizable: false,
    frame: false
  })
  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  mainWindow.once('ready-to-show', () => { //渲染进程第一渲染完成触发，防止白屏
    mainWindow.show()
  })
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

ipcMain.on('minClient', (e, args) => {
  mainWindow.minimize()
})
// ipcMain.on('openDialog', (e, args) => {
//   if (args) {
//     child.show()
//   } else {
//     child.hide()
//   }
// })

ipcMain.on('selectFile', (e, args) => {
  dialog.showOpenDialog(mainWindow, {
    title: '请选择文件',
    defaultPath: 'D:\\freespace',
    properties: [
      'openFile',
      'showHiddenFiles',
      'createDirectory',
      'promptToCreate'
    ]
  }, (filePaths) => {
    console.log(filePaths)
  })
});

let cacheObjct = null;
ipcMain.on('initCache', (e, args) => {
  fs.checkFile(`userData`);
  cacheObjct = new cache(args);
});

ipcMain.on('dealCache', (event, args) => {
  const { type, key, data } = args;
  switch(type) {
    case 1: // 获取缓存数据
      const resp = cacheObjct.getCacheByKey(key);
      // event.reply('dealCacheResp', data); 这种方式不行？why
      event.sender.send('dealCacheResp', { key, data: resp });
      break;
    case 2: // 设置缓存
      cacheObjct.setCache(key, data);
      break;
    case 3: // 删除缓存
      cacheObjct.removeCacheBykey(key);
      break;
    case 4: // 清空本地缓存
      cacheObjct.clear();
      break;
  };
})
