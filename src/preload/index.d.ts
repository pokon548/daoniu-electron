import { ElectronAPI } from '@electron-toolkit/preload'
import { ChannelType } from 'src/common/magicDef'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      sendMessage(channel: ChannelType, ...args: unknown[]): void
      on(channel: ChannelType, func: (...args: unknown[]) => void): Electron.IpcRenderer
      once(channel: ChannelType, func: (...args: unknown[]) => void): void
    }
  }
}
