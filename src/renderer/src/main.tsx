import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css'
import App from './App'

import { ChannelType, DrawingMessage, NormalUrlMessage } from '../../common/magicDef'
import { WebviewInstance, WebviewType, useBearStore } from './data/store/appStore'

import { v4 as uuidv4 } from 'uuid'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

window.api.on(ChannelType.Drawing, (arg: unknown) => {
  const message = arg as NormalUrlMessage
  const oldStore = useBearStore.getState().webviewInstances

  useBearStore.setState({
    webviewInstances: oldStore.concat([
      new WebviewInstance(WebviewType.Mindmap, uuidv4(), '思维导图', message.url)
    ])
  })

  useBearStore.setState({
    currentTabIndex: oldStore.length
  })
})

window.api.on(ChannelType.LiuchengHome, (arg: unknown) => {
  const message = arg as NormalUrlMessage
  const oldStore = useBearStore.getState().webviewInstances

  useBearStore.setState({
    webviewInstances: oldStore.concat([
      new WebviewInstance(WebviewType.LiuchengHome, uuidv4(), '流程图 - 首页', message.url)
    ])
  })

  useBearStore.setState({
    currentTabIndex: oldStore.length
  })
})

// window.api.sendMessage(CHANNEL_NAME, ['ping'])
