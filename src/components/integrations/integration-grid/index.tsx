import { IntegrationCard } from '../integration-card'
import { PaginationItems } from '../pagination-items'
import { useIntegrationsGrid } from './useIntegrationsGrid'

export function IntegrationGrid() {
  const {
    integrations,
    filteredIntegrations,
    paginatedIntegrations,
    totalIntegrations,
    pagination,
    onPageChange,
  } = useIntegrationsGrid()

  return (
    <div className="m-auto flex max-w-2xl flex-col space-y-4 px-8 pb-8">
      <span className="block text-accent-foreground/50 text-sm">
        {totalIntegrations || integrations.length} integrações encontradas
      </span>
      <ul className="mx-auto grid grid-cols-2 xs:grid-cols-3 grid-rows-6 xs:grid-rows-4 gap-4 sm:grid-cols-4 sm:grid-rows-3">
        {paginatedIntegrations.map((integration) => (
          <IntegrationCard key={integration.app_id} integration={integration} />
        ))}
      </ul>

      <PaginationItems
        totalItems={filteredIntegrations.length}
        itemsPerPage={pagination.itemsPerPage}
        currentPage={pagination.currentPage}
        onPageChange={onPageChange}
      />
    </div>
  )
}
