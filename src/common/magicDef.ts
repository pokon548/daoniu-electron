export enum ChannelType {
  Drawing = 'Zhixi drawing page requests from main process',
  Website = 'Zhixi arbitrary / third party websites requests from main process'
}

export class DrawingMessage {
  url: string
  constructor(url: string) {
    this.url = url
  }
}
