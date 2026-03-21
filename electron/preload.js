'use strict'

const { contextBridge, ipcRenderer } = require('electron')

document.addEventListener('DOMContentLoaded', () => {
  injectTitlebar({ color: '#00C8FF', bg: 'rgba(8,12,20,0.96)' })
})

function injectTitlebar ({ color, bg }) {
  const bar = document.createElement('div')
  bar.id = '_etb'
  bar.innerHTML = `
    <span class="_etb-title">Christopher Cadger</span>
    <div class="_etb-drag"></div>
    <div class="_etb-controls">
      <button class="_etb-btn _pres" title="Presentation Mode">⛶</button>
      <button class="_etb-btn _min" title="Minimize">&#8722;</button>
      <button class="_etb-btn _max" title="Maximize">&#9633;</button>
      <button class="_etb-btn _cls" title="Close">&#215;</button>
    </div>
  `
  document.body.prepend(bar)

  const style = document.createElement('style')
  style.textContent = `
    #_etb {
      position: fixed; top: 0; left: 0; right: 0; height: 36px;
      display: flex; align-items: center;
      background: ${bg}; backdrop-filter: blur(12px);
      -webkit-app-region: drag; z-index: 2147483647;
      border-bottom: 1px solid rgba(0,200,255,0.15);
      user-select: none;
    }
    ._etb-title {
      font-family: 'Segoe UI', -apple-system, sans-serif;
      font-size: 13px; font-weight: 600; letter-spacing: 0.03em;
      color: ${color}; padding: 0 0 0 14px; -webkit-app-region: drag;
    }
    ._etb-drag { flex: 1; height: 100%; -webkit-app-region: drag; }
    ._etb-controls { display: flex; align-items: center; gap: 8px; padding: 0 14px; -webkit-app-region: no-drag; }
    ._etb-btn {
      width: 13px; height: 13px; border-radius: 50%; border: none;
      cursor: pointer; font-size: 0; transition: filter 0.15s, transform 0.1s;
    }
    ._etb-btn._pres { background: #7C3AED; font-size: 8px; display: flex; align-items: center; justify-content: center; }
    ._etb-btn:hover { filter: brightness(1.25); transform: scale(1.1); }
    ._etb-btn:active { transform: scale(0.95); }
    ._min { background: #FEBC2E; } ._max { background: #28C840; } ._cls { background: #FF5F57; }
    body { padding-top: 36px !important; }
    * { -webkit-font-smoothing: antialiased; }
  `
  document.head.appendChild(style)
  bar.querySelector('._min').addEventListener('click', () => window.electronAPI.minimize())
  bar.querySelector('._max').addEventListener('click', () => window.electronAPI.maximize())
  bar.querySelector('._cls').addEventListener('click', () => window.electronAPI.close())
  bar.querySelector('._pres').addEventListener('click', () => window.electronAPI.toggleFullscreen())
}

contextBridge.exposeInMainWorld('electronAPI', {
  minimize:        () => ipcRenderer.invoke('window:minimize'),
  maximize:        () => ipcRenderer.invoke('window:maximize'),
  close:           () => ipcRenderer.invoke('window:close'),
  isMaximized:     () => ipcRenderer.invoke('window:isMaximized'),
  toggleFullscreen:() => ipcRenderer.invoke('window:fullscreen'),
  isFullscreen:    () => ipcRenderer.invoke('window:isFullscreen'),
  notify:          (title, body) => ipcRenderer.invoke('notify', { title, body }),
  store: {
    get:    key        => ipcRenderer.invoke('store:get', key),
    set:    (key, val) => ipcRenderer.invoke('store:set', key, val),
    delete: key        => ipcRenderer.invoke('store:delete', key),
    clear:  ()         => ipcRenderer.invoke('store:clear')
  },
  onNavigate:         cb => ipcRenderer.on('navigate', (_, screen) => cb(screen)),
  openExternal:       url => ipcRenderer.invoke('shell:openExternal', url),
  onUpdateAvailable:  cb => ipcRenderer.on('update:available', cb),
  onUpdateReady:      cb => ipcRenderer.on('update:ready', cb),
  installUpdate:   () => ipcRenderer.invoke('update:install'),
  version:         () => ipcRenderer.invoke('app:version'),
  platform: process.platform,
  isElectron: true
})
