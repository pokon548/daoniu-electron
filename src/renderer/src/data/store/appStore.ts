import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'

interface AppState {
  currentTabIndex: number
  webviewInstances: Array<WebviewInstance>
  setCurrentTabIndex: (index: number) => void
  removeWebviewInstanceByIndex: (index: number) => void
}

export enum WebviewType {
  Home,
  Mindmap,
  Other
}

interface IWebviewInstance {
  type: WebviewType
  uuid: string
  title: string
  url: string
}

export class WebviewInstance implements IWebviewInstance {
  type: WebviewType
  uuid: string
  title: string
  url: string

  constructor(type: WebviewType, uuid: string, title: string, url: string) {
    this.type = type
    this.uuid = uuid
    this.title = title
    this.url = url
  }
}

export const useBearStore = create<AppState>()(
  subscribeWithSelector((set) => ({
    currentTabIndex: 0,
    webviewInstances: [
      new WebviewInstance(WebviewType.Home, uuidv4(), '知犀', 'https://www.zhixi.com/desktop/space')
    ],
    setCurrentTabIndex: (index: number): void => set(() => ({ currentTabIndex: index })),
    removeWebviewInstanceByIndex: (index: number): void =>
      set((state) => ({
        webviewInstances: state.webviewInstances.filter((data, idx) => idx !== index)
      }))
  }))
)
