import { IntegrationGrid, IntegrationModal } from './components/integrations'
import { Header } from './components/layout/header'

function App() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl bg-white dark:bg-black">
      <Header />

      <IntegrationGrid />

      <IntegrationModal />
    </main>
  )
}

export default App
