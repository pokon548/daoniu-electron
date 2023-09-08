import { useEffect } from 'react'
import { GeneralWebviewTab } from './components/tabs/GeneralWebviewTab'
import { HomeTab } from './components/tabs/HomeTab'
import { MindmapTab } from './components/tabs/MindmapTab'
import { WebviewInstance, WebviewType, useBearStore } from './data/store/appStore'

import './styles/react-tabs.css'
import { ArrowClockwise, ArrowLeft, ArrowRight, Minus, Square, X } from '@phosphor-icons/react'
import { subscribe, unsubscribe } from './lib/customWebviewEvent'
import { WebviewTag } from 'electron'
import { LiuchengTab } from './components/tabs/LiuchengTab'

function App(): JSX.Element {
  const tabs = useBearStore((state) => state.webviewInstances)
  const [activeIndex, setActiveIndex] = useBearStore((state) => [
    state.currentTabIndex,
    state.setCurrentTabIndex
  ])
  const removeWebviewById = useBearStore((state) => state.removeWebviewInstanceByIndex)

  /* TODO: We dangerously assume index here is identical to zustard saved
   * this is not safe and robust
   */
  useEffect(() => {
    subscribe('did-navigate', (event) => {
      event.preventDefault()
      const webview = event.target as WebviewTag
      const index = Number(webview.getAttribute('internalTabIndex'))

      const oldStore = useBearStore.getState().webviewInstances
      const tab = oldStore.at(index)

      const uuid = tab?.uuid
      const type = tab?.type
      const canGoBack = webview.canGoBack()
      const canGoForward = webview.canGoForward()
      const newUrl = webview.getURL()

      if (tab) {
        console.log('Request coming from webview ' + uuid + ' and the url is: ' + newUrl)
        tab.canGoBack = canGoBack
        tab.canGoForward = canGoForward

        // Never push the history of home
        if (type !== WebviewType.Home) {
          tab.historyUrl.push(newUrl)

          oldStore[index] = tab
          useBearStore.setState({
            webviewInstances: oldStore
          })
        }

        if (type === WebviewType.Home) {
          console.log("It's home")
        } else if (type === WebviewType.Mindmap) {
          console.log('mindmap')
        }
      }

      unsubscribe('did-navigate', () => {})
    })
  })

  return (
    <div className="container w-screen h-screen max-w-full justify-items-center">
      <div className="flex h-10">
        <ul className="flex h-10 shrink items-center bg-zinc-300 dark:bg-zinc-800 pl-1 pr-1">
          {tabs[activeIndex].canGoBack ? (
            <button className="mx-1">
              <ArrowLeft className="text-white w-5 h-5" />
            </button>
          ) : (
            <button className="mx-1" disabled>
              <ArrowLeft className="text-gray-500 w-5 h-5" />
            </button>
          )}

          {tabs[activeIndex].canGoForward ? (
            <button className="mx-1">
              <ArrowRight className="text-white w-5 h-5" />
            </button>
          ) : (
            <button className="mx-1" disabled>
              <ArrowRight className="text-gray-500 w-5 h-5" />
            </button>
          )}

          <button className="mx-1">
            <ArrowClockwise className="text-white w-5 h-5" />
          </button>
        </ul>
        <ul className="flex h-10 shrink items-center bg-zinc-300 dark:bg-zinc-800">
          {tabs.map((tab) => (
            <TabSelector
              key={tab.uuid}
              isActive={tabs.indexOf(tab) === activeIndex}
              isClosable={tab.type !== WebviewType.Home}
              onClick={(): void => {
                const index = tabs.indexOf(tab)
                setActiveIndex(index)
              }}
              onClose={(): void => {
                const index = tabs.indexOf(tab)
                removeWebviewById(index)
                setActiveIndex(index - 1)
              }}
            >
              {tab}
            </TabSelector>
          ))}
        </ul>

        <div className="titlebar flex justify-center place-items-center select-none align-middle w-full bg-zinc-300 dark:bg-zinc-800"></div>

        <div className="bg-zinc-300 dark:bg-zinc-800 flex content-center">
          <button
            onClick={(e): void => {
              e.preventDefault()
              window.electron.ipcRenderer.send('minimize')
            }}
          >
            <Minus className="w-4 h-4 mx-2 text-gray-400" />
          </button>
          <button
            onClick={(e): void => {
              e.preventDefault()
              window.electron.ipcRenderer.send('maximize')
            }}
          >
            <Square className="w-4 h-4 mx-1 ml-1 text-gray-400" />
          </button>
          <button
            onClick={(e): void => {
              e.preventDefault()
              window.electron.ipcRenderer.send('close')
            }}
          >
            <X className="w-4 h-4 mx-2 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex flex-col tab-panel">
        {tabs.map((tab) => (
          <div
            className={tabs.indexOf(tab) === activeIndex ? 'w-full h-full' : 'hidden'}
            key={tab.uuid}
          >
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{
                __html: `<webview class="w-full h-full" src="` + tab.url + `" allowpopups/>`
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const TabSelector = ({
  isActive,
  isClosable,
  children,
  onClick,
  onClose
}: {
  isActive: boolean
  isClosable: boolean
  children: WebviewInstance
  onClick: () => void
  onClose: () => void
}): JSX.Element => (
  <li className="relative">
    <div onClick={onClick} role="tab" aria-selected={isActive ? 'true' : 'false'}>
      <div
        className={`flex h-10 tab-outer-style px-3.5 py-1.5 ${
          isActive ? 'bg-zinc-100 dark:bg-zinc-700 rounded-t' : ''
        }`}
      >
        {children.type === WebviewType.Home ? (
          <HomeTab title={children.title} />
        ) : children.type === WebviewType.LiuchengHome ? (
          <HomeTab title={children.title} />
        ) : children.type === WebviewType.GeneralWebview ? (
          <GeneralWebviewTab title={children.title} />
        ) : children.type === WebviewType.Liucheng ? (
          <LiuchengTab title={children.title} />
        ) : (
          <MindmapTab title={children.title} />
        )}

        {isClosable ? (
          <span className="flex items-center">
            <button
              className="pl-2"
              onClick={(e): void => {
                e.stopPropagation()
                onClose()
              }}
              title="Close tab"
            >
              <X className='text-gray-500 dark:text-white'/>
            </button>
          </span>
        ) : (
          <></>
        )}
      </div>
    </div>
  </li>
)

export default App
