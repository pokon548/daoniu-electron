import { IpcRendererEvent, contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

export type Channels = 'daoniu'

// Custom APIs for renderer
const api = {
  sendMessage(channel: Channels, ...args: unknown[]): void {
    ipcRenderer.send(channel, ...args)
  },
  on(channel: Channels, func: (...args: unknown[]) => void): () => void {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]): void => func(...args)
    ipcRenderer.on(channel, subscription)

    return () => {
      ipcRenderer.removeListener(channel, subscription)
    }
  },
  once(channel: Channels, func: (...args: unknown[]) => void): void {
    ipcRenderer.once(channel, (_event, ...args) => func(...args))
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
