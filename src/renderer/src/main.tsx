import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css'
import App from './App'

import { ChannelType, NormalUrlMessage } from '../../common/magicDef'
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
      new WebviewInstance(
        WebviewType.Mindmap,
        uuidv4(),
        '思维导图',
        message.url,
        [message.title],
        [message.url],
        message.webId
      )
    ])
  })

  useBearStore.setState({
    currentTabIndex: oldStore.length
  })
})

window.api.on(ChannelType.Website, (arg: unknown) => {
  const message = arg as NormalUrlMessage
  const oldStore = useBearStore.getState().webviewInstances

  useBearStore.setState({
    webviewInstances: oldStore.concat([
      new WebviewInstance(
        WebviewType.GeneralWebview,
        uuidv4(),
        '网页',
        message.url,
        [message.title],
        [message.url],
        message.webId
      )
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
      new WebviewInstance(
        WebviewType.LiuchengHome,
        uuidv4(),
        '流程图 - 首页',
        message.url,
        [message.title],
        [message.url],
        message.webId
      )
    ])
  })

  useBearStore.setState({
    currentTabIndex: oldStore.length
  })
})

window.api.on(ChannelType.GeneralUpdateHistory, (arg: unknown) => {
  const message = arg as NormalUrlMessage
  const webviewInstances = useBearStore.getState().webviewInstances
  const targetWebview = webviewInstances.filter((data) => data.webId === message.webId)[0]
  const targetWebviewId = webviewInstances.indexOf(targetWebview)

  if (targetWebview) {
    if (targetWebview.historyUrl[-1]) {
      if (targetWebview.historyUrl[-1] !== message.url) {
        useBearStore.setState({
          webviewInstances: webviewInstances.splice(
            targetWebviewId,
            1,
            new WebviewInstance(
              targetWebview.type,
              targetWebview.uuid,
              targetWebview.title,
              message.url,
              targetWebview.historyTitle,
              targetWebview.historyUrl.concat(message.url),
              targetWebview.webId
            )
          )
        })
      }
    }
  }
})
