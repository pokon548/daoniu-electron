import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css'
import App from './App'

import { CHANNEL_NAME } from '../../common/magicDef'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// calling IPC exposed from preload script
window.api.once(CHANNEL_NAME, (arg: unknown) => {
  // eslint-disable-next-line no-console
  console.log(arg)
})
window.api.sendMessage(CHANNEL_NAME, ['ping'])
