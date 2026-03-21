'use strict'

const { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain, Notification, shell } = require('electron')
const { autoUpdater } = require('electron-updater')
const Store = require('electron-store')
const path = require('path')

const store = new Store({ encryptionKey: 'portfolio-v1-secure' })

let win, tray

const APP = {
  name: 'Portfolio',
  color: '#00C8FF',
  bgColor: '#080C14',
  width: 1440,
  height: 900,
  minWidth: 1000,
  minHeight: 700,
  trayTooltip: 'Christopher Cadger — AI Engineer Portfolio',
  icon: path.join(__dirname, '../icons/icon-512.png'),
  trayIcon: path.join(__dirname, '../icons/icon-192.png')
}

if (!app.requestSingleInstanceLock()) { app.quit(); process.exit(0) }
app.on('second-instance', () => {
  if (win) { if (win.isMinimized()) win.restore(); win.show(); win.focus() }
})

function createWindow () {
  win = new BrowserWindow({
    width: store.get('win.width', APP.width),
    height: store.get('win.height', APP.height),
    x: store.get('win.x'),
    y: store.get('win.y'),
    minWidth: APP.minWidth,
    minHeight: APP.minHeight,
    frame: false,
    backgroundColor: APP.bgColor,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true,
      spellcheck: false
    },
    icon: APP.icon
  })

  win.loadFile(path.join(__dirname, '../index.html'))

  win.once('ready-to-show', () => {
    win.show(); win.focus()
    if (app.isPackaged) autoUpdater.checkForUpdatesAndNotify()
  })

  const saveState = () => {
    if (!win || win.isDestroyed() || win.isMinimized() || win.isMaximized()) return
    const [w, h] = win.getSize(); const [x, y] = win.getPosition()
    store.set({ 'win.width': w, 'win.height': h, 'win.x': x, 'win.y': y })
  }
  win.on('resize', saveState); win.on('move', saveState)
  win.on('close', e => { if (!app.isQuitting) { e.preventDefault(); win.hide() } })
  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }))
}

function createTray () {
  let icon
  try { icon = nativeImage.createFromPath(APP.trayIcon).resize({ width: 16, height: 16 }) }
  catch { icon = nativeImage.createEmpty() }

  tray = new Tray(icon)
  tray.setToolTip(APP.trayTooltip)
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: '👨‍💻 Christopher Cadger', enabled: false },
    { type: 'separator' },
    { label: 'Open Portfolio', click: () => { win.show(); win.focus() } },
    { label: 'Presentation Mode', click: () => { win.show(); win.focus(); win.setFullScreen(true); win.webContents.send('navigate', 'presentation') } },
    { label: 'View on Codeberg', click: () => shell.openExternal('https://codeberg.org/cadger808') },
    { type: 'separator' },
    { label: 'Quit', click: () => { app.isQuitting = true; app.quit() } }
  ]))
  tray.on('double-click', () => { win.show(); win.focus() })
}

ipcMain.handle('window:minimize', () => win.minimize())
ipcMain.handle('window:maximize', () => win.isMaximized() ? win.unmaximize() : win.maximize())
ipcMain.handle('window:close', () => win.hide())
ipcMain.handle('window:isMaximized', () => win.isMaximized())
ipcMain.handle('window:fullscreen', () => win.setFullScreen(!win.isFullScreen()))
ipcMain.handle('window:isFullscreen', () => win.isFullScreen())

ipcMain.handle('notify', (_, { title, body }) => {
  if (Notification.isSupported()) new Notification({ title, body, icon: APP.icon }).show()
})

ipcMain.handle('store:get', (_, key) => store.get(key))
ipcMain.handle('store:set', (_, key, value) => store.set(key, value))
ipcMain.handle('store:delete', (_, key) => store.delete(key))
ipcMain.handle('store:clear', () => store.clear())
ipcMain.handle('shell:openExternal', (_, url) => {
  if (url && (url.startsWith('https://') || url.startsWith('http://'))) shell.openExternal(url)
})
ipcMain.handle('app:version', () => app.getVersion())

autoUpdater.on('update-downloaded', () => { if (win) win.webContents.send('update:ready') })
ipcMain.handle('update:install', () => { app.isQuitting = true; autoUpdater.quitAndInstall() })

// GPU acceleration — must be set before app.whenReady()
app.commandLine.appendSwitch('enable-gpu-rasterization')
app.commandLine.appendSwitch('enable-zero-copy')

app.whenReady().then(() => { createWindow(); createTray() })
app.on('window-all-closed', e => e.preventDefault())
app.on('before-quit', () => { app.isQuitting = true })
