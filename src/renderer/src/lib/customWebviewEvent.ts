import { WebviewTag } from 'electron'

/* eslint-disable @typescript-eslint/explicit-function-return-type */
function subscribe(eventName: string, listener: EventListener) {
  const webviews = document.querySelectorAll('webview')
  webviews.forEach((webview, number) => {
    webview.setAttribute('internalTabIndex', number.toString()) //TODO: Notified for setting index logic in implicited function
    webview.addEventListener(eventName, listener)
  })
}

function unsubscribe(eventName: string, listener: EventListener) {
  const webviews = document.querySelectorAll('webview')
  webviews.forEach((webview) => {
    webview.removeEventListener(eventName, listener)
  })
}

function reload(index: number) {
  const webviews = document.querySelectorAll('webview')
  const target = webviews[index] as WebviewTag
  target.reload()
}

function goBack(index: number) {
  const webviews = document.querySelectorAll('webview')
  const target = webviews[index] as WebviewTag
  target.goBack()
}

function goForward(index: number) {
  const webviews = document.querySelectorAll('webview')
  const target = webviews[index] as WebviewTag
  target.goForward()
}
function publish(eventName: string, data) {
  const event = new CustomEvent(eventName, { detail: data })
  document.dispatchEvent(event)
}

export { publish, reload, goBack, goForward, subscribe, unsubscribe }
