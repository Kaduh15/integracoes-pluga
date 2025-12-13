import { SearchIcon } from 'lucide-react'
import { useIntegrationsStore } from '@/state/integrations.store'

export function Header() {
  const { setSearch } = useIntegrationsStore()

  const handlerSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  return (
    <header className="mx-auto flex flex-col items-center justify-center gap-4 px-8 py-4">
      <img
        src="/logo-pluga.svg"
        alt="logo da Pluga"
        className="aspect-auto w-40 sm:w-48 md:w-60"
      />

      <h1 className="font-bold text-2xl text-muted-foreground">
        Ferramentas Instegradas
      </h1>

      <p className="max-w-xl text-center font-normal text-accent-foreground/50 sm:w-3/4">
        Explore as diversas integrações disponíveis para otimizar seus fluxos de
        trabalho e aumentar sua produtividade.
      </p>

      <div className="flex items-center gap-2 rounded-md border border-accent-foreground/10 bg-white px-4 py-2 shadow-md">
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
