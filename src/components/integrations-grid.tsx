import { useIntegrations } from '@/hooks/useIntegrations'
import { useIntegrationsStore } from '@/state/integrations-store'
import { IntegrationCard } from './integration-card'
import { PaginationItems } from './pagination-items'

export function IntegrationList() {
  const { integrations } = useIntegrations()
  const { searchValue, pagination } = useIntegrationsStore(({ state }) => state)
  const { nextPage, previousPage, onPageChange } = useIntegrationsStore(
    ({ actions }) => (actions),
  )

  const totalIntegrations = integrations.length

  const filteredIntegrations = integrations.filter((integration) =>
    integration.name.toLowerCase().includes(searchValue.toLowerCase()),
  )

  const lastPage = Math.ceil(
    filteredIntegrations.length / pagination.itemsPerPage,
  )

  return (
    <div className="mb-4 flex max-w-7xl flex-col space-y-4 px-8">
      <span className="block text-accent-foreground/50 text-sm">
        {totalIntegrations || integrations.length} integrações encontradas
      </span>
      <ul className="mx-auto grid grid-cols-2 grid-rows-6 gap-4 md:grid-cols-3 md:grid-rows-4 lg:grid-cols-4 lg:grid-rows-3">
        {filteredIntegrations
          .slice(
            (pagination.currentPage - 1) * pagination.itemsPerPage,
            pagination.currentPage * pagination.itemsPerPage,
          )
          .map((integration) => (
            <IntegrationCard key={integration.app_id} {...integration} />
          ))}
      </ul>

      <PaginationItems
        totalItems={filteredIntegrations.length}
        itemsPerPage={pagination.itemsPerPage}
        currentPage={pagination.currentPage}
        nextPage={() => {
          nextPage(lastPage)
        }}
        previousPage={() => {
          previousPage()
        }}
        onPageChange={(page) => {
          onPageChange(page)
        }}
      />
    </div>
  )
}
