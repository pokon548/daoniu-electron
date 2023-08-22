export enum ChannelType {
  Drawing = 'Zhixi drawing page requests from main process',
  Liucheng = 'Zhixi liucheng tu',
  LiuchengHome = 'Zhixi liucheng tu shou ye',
  Website = 'Zhixi arbitrary / third party websites requests from main process'
}

export class DrawingMessage {
  url: string
  constructor(url: string) {
    this.url = url
  }
}

export class NormalUrlMessage {
  url: string
  constructor(url: string) {
    this.url = url
  }
}
