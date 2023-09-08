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
  LiuchengHome,
  Liucheng,
  GeneralWebview,
  Other
}

interface IWebviewInstance {
  type: WebviewType
  uuid: string
  title: string
  url: string
  canGoBack: boolean
  canGoForward: boolean
  historyTitle: string[]
  historyUrl: string[]
  webId: number
}

export class WebviewInstance implements IWebviewInstance {
  type: WebviewType
  uuid: string
  title: string
  url: string
  canGoBack: boolean
  canGoForward: boolean
  historyTitle: string[]
  historyUrl: string[]
  webId: number

  constructor(
    type: WebviewType,
    uuid: string,
    title: string,
    url: string,
    canGoBack: boolean,
    canGoForward: boolean,
    historyTitle: string[],
    historyUrl: string[],
    webId: number
  ) {
    this.type = type
    this.uuid = uuid
    this.title = title
    this.url = url
    this.canGoBack = canGoBack
    this.canGoForward = canGoForward
    this.historyTitle = historyTitle
    this.historyUrl = historyUrl
    this.webId = webId
  }
}

export const useBearStore = create<AppState>()(
  subscribeWithSelector((set) => ({
    currentTabIndex: 0,
    webviewInstances: [
      new WebviewInstance(
        WebviewType.Home,
        uuidv4(),
        '首页',
        'https://www.zhixi.com/space',
        false,
        false,
        ['首页'],
        ['https://www.zhixi.com/space'],
        -1
      ) // We don't know the webId for now, will be updated later
    ],
    setCurrentTabIndex: (index: number): void => set(() => ({ currentTabIndex: index })),
    removeWebviewInstanceByIndex: (index: number): void =>
      set((state) => ({
        webviewInstances: state.webviewInstances.filter((_data, idx) => idx !== index)
      }))
  }))
)
