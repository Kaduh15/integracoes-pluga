import { SearchIcon } from 'lucide-react'
import { useIntegrationsStore } from '@/state/integrations-store'

export function Header() {
  const { actions } = useIntegrationsStore()

  const handlerSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    actions.setSearch(event.target.value)
  }

  return (
    <header className="mx-auto flex flex-col items-center justify-center gap-4 p-8">
      <img src="/logo-pluga.svg" alt="logo da Pluga" />

      <h1 className="font-bold text-4xl text-muted-foreground">
        Ferramentas Instegradas
      </h1>

      <p className="w-1/2 text-center font-normal text-accent-foreground/50">
        Explore as diversas integrações disponíveis para otimizar seus fluxos de
        trabalho e aumentar sua produtividade.
      </p>

      <div className="flex w-1/3 items-center gap-2 rounded-md border border-accent-foreground/10 bg-white px-4 py-2 shadow-md">
        <SearchIcon className="text-accent-foreground/50" />
        <input
          autoComplete="off"
          className="flex-1 focus:outline-none"
          id="search"
          name="search"
          placeholder="Buscar integração..."
          type="text"
          onChange={handlerSearch}
        />
      </div>
    </header>
  )
}
