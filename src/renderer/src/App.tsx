function App(): JSX.Element {
  return (
    <div className="flex h-screen">
      <div
        className="w-full h-full"
        dangerouslySetInnerHTML={{
          __html: `<webview class="w-full h-full" src="https://www.zhixi.com/desktop/space" allowpopups/>`
        }}
      />
    </div>
  )
}

export default App
