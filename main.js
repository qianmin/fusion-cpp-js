// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

require('@electron/remote/main').initialize()

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 1200,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,   // 使用remote模块
      webviewTag: true,	// 5版本及以上需要打开
    }
  })
  require("@electron/remote/main").enable(mainWindow.webContents)

  // and load the index.html of the app.
  mainWindow.loadFile('./src/main_ui/qianmin.html')
  // mainWindow.loadFile('./src/main_ui/index.html')

  // Open the DevTools.
   mainWindow.webContents.openDevTools()


}




// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  // 隐藏菜单栏
  // const { Menu } = require('electron');
  // Menu.setApplicationMenu(null);

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
// App close handler

app.on('window-all-closed', function () {
  app.exit()
  // if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
