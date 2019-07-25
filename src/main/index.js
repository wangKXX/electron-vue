import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import '../renderer/store'
const cache = require('./cache');
const fs = require('./cache/plugins')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
// let child
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#/chat`
  : `file://${__dirname}/index.html`
// const winURL = 'http://localhost:9080'
function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 590,
    useContentSize: true,
    width: 850,
    show: false,
    center: true,
    resizable: false,
    frame: false
  })
  // child = new BrowserWindow({
  //   parent: mainWindow,
  //   modal: true,
  //   show: false,
  //   width: 300,
  //   height: 200
  // })
  // child.loadURL('www.baidu.com')
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
  // cacheObjct.setCache('userList', {
  //   id: 1,
  //   nick: '张起灵',
  //   lastMsg: {
  //     date: new Date(),
  //     content: '我是小哥'
  //   }
  // });
  // cacheObjct.setCache('userList', {
  //   id: 2,
  //   nick: '天真',
  //   lastMsg: {
  //     date: new Date(),
  //     content: '我是小哥'
  //   }
  // });
});

ipcMain.on('dealCache', (event, args) => {
  console.log(args)
  const { type, key, data } = args;
  switch(type) {
    case 1: // 获取缓存数据
      const resp = cacheObjct.getCacheByKey(key);
      // event.reply('dealCacheResp', data); 这种方式不行？why
      event.sender.send('dealCacheResp', { key, data: resp });
      break;
    case 2: // 设置缓存
      console.log(data);
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
