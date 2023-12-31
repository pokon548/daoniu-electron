import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { ChannelType, NormalUrlMessage } from '../common/magicDef'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webviewTag: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  app.on('web-contents-created', (_createEvent, contents) => {
    contents.setWindowOpenHandler(({ url }) => {
      if (url.startsWith('https://www.zhixi.com/drawing/')) {
        mainWindow.webContents.send(
          ChannelType.Drawing,
          new NormalUrlMessage(url, contents.getTitle(), contents.id)
        )
      } else if (url.startsWith('https://www.zhixi.com/tpl/')) {
        mainWindow.webContents.send(
          ChannelType.Drawing,
          new NormalUrlMessage(url, contents.getTitle(), contents.id)
        )
      } else if (url.startsWith('https://draw.zhixi.com/space')) {
        mainWindow.webContents.send(
          ChannelType.LiuchengHome,
          new NormalUrlMessage(url, contents.getTitle(), contents.id)
        )
      } else if (url.startsWith('https://draw.zhixi.com/drawing/')) {
        mainWindow.webContents.send(
          ChannelType.Liucheng,
          new NormalUrlMessage(url, contents.getTitle(), contents.id)
        )
      } else if (url === 'https://www.zhixi.com/space?page=owner') {
        // TODO: Jump to personal file
      } else if (url === 'https://www.zhixi.com/about') {
        // TODO: Warn users that we are unofficial products
      } else {
        console.log(url)
        mainWindow.webContents.send(
          ChannelType.Website,
          new NormalUrlMessage(url, contents.getTitle(), contents.id)
        )
      }
      return { action: 'deny' }
    })
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  ipcMain.on('minimize', () => {
    mainWindow.minimize()
  })

  ipcMain.on('maximize', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.restore()
    } else {
      mainWindow.maximize()
    }
  })

  ipcMain.on('close', () => {
    mainWindow.close()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
