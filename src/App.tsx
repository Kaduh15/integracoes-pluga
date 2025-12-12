import { Header } from './components/header'
import { IntegrationModal } from './components/intagration-modal'
import { IntegrationList } from './components/integrations-grid'

function App() {
  return (
    <main className="">
      <Header />

      <IntegrationList />

      <IntegrationModal name="teste" icon="" />
    </main>
  )
}

export default App
