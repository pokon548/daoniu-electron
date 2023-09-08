import { GeneralWebviewTab } from './components/tabs/GeneralWebviewTab'
import { HomeTab } from './components/tabs/HomeTab'
import { MindmapTab } from './components/tabs/MindmapTab'
import { WebviewInstance, WebviewType, useBearStore } from './data/store/appStore'

import './styles/react-tabs.css'
import { Minus, Square, X } from '@phosphor-icons/react'

function App(): JSX.Element {
  const tabs = useBearStore((state) => state.webviewInstances)
  const [activeIndex, setActiveIndex] = useBearStore((state) => [
    state.currentTabIndex,
    state.setCurrentTabIndex
  ])
  const removeWebviewById = useBearStore((state) => state.removeWebviewInstanceByIndex)

  return (
    <div className="container w-screen h-screen max-w-full justify-items-center">
      <div className="flex h-10">
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
              <X />
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
