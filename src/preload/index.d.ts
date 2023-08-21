import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      sendMessage(channel: Channels, ...args: unknown[]): void
      on(channel: Channels, func: (...args: unknown[]) => void): Electron.IpcRenderer
      once(channel: Channels, func: (...args: unknown[]) => void): void
    }
  }
}
