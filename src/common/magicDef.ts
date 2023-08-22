export enum ChannelType {
  Drawing = 'Zhixi drawing page requests from main process',
  Liucheng = 'Zhixi liucheng tu',
  LiuchengHome = 'Zhixi liucheng tu shou ye',
  Website = 'Zhixi arbitrary / third party websites requests from main process',

  GeneralUpdateHistory = 'Update webview history to provide better experience'
}

export class NormalUrlMessage {
  url: string
  title: string
  webId: number
  constructor(url: string, title: string, webId: number) {
    this.url = url
    this.title = title
    this.webId = webId
  }
}
