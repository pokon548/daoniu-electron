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

export { subscribe, unsubscribe }
