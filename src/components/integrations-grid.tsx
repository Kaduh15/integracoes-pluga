import { useIntegrations } from '@/hooks/useIntegrations'
import { useIntegrationsStore } from '@/state/integrations-store'
import { IntegrationCard } from './integration-card'

export function IntegrationList() {
  const { integrations } = useIntegrations()
  const { searchValue, pagination } = useIntegrationsStore(({ state }) => state)
  const { nextPage, previousPage } = useIntegrationsStore(
    ({ actions }) => actions,
  )

  const totalIntegrations = integrations.length

  const filteredIntegrations = integrations
    .filter((integration) =>
      integration.name.toLowerCase().includes(searchValue.toLowerCase()),
    )
    .slice(
      (pagination.currentPage - 1) * pagination.itemsPerPage,
      pagination.currentPage * pagination.itemsPerPage,
    )

  const lastPage = Math.ceil(totalIntegrations / pagination.itemsPerPage)

  return (
    <div className="mx-auto max-w-7xl space-y-4 px-8">
      <span className="block text-accent-foreground/50 text-sm">
        {totalIntegrations || integrations.length} integrações encontradas total
        page: {Math.ceil(totalIntegrations / pagination.itemsPerPage)} - current
        page: {pagination.currentPage}
      </span>
      <ul className="grid grid-cols-4 grid-rows-3">
        {filteredIntegrations.map((integration) => (
          <IntegrationCard key={integration.app_id} {...integration} />
        ))}
      </ul>

      <button onClick={() => nextPage(lastPage)} type="button">
        next
      </button>
      <button onClick={previousPage} type="button">
        previous
      </button>
    </div>
  )
}
