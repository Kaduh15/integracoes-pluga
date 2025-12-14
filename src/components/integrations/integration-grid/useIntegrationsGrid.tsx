import { useIntegrationsQuery } from '@/hooks/useIntegrations'
import { useIntegrationsStore } from '@/stores/integrations.store'

export function useIntegrationsGrid() {
  const { integrations } = useIntegrationsQuery()
  const { searchValue, pagination, onPageChange } = useIntegrationsStore()

  const totalIntegrations = integrations.length

  const filteredIntegrations = integrations.filter((integration) =>
    integration.name.toLowerCase().includes(searchValue.toLowerCase()),
  )

  const paginatedIntegrations = filteredIntegrations.slice(
    (pagination.currentPage - 1) * pagination.itemsPerPage,
    pagination.currentPage * pagination.itemsPerPage,
  )

  return {
    integrations,
    filteredIntegrations,
    paginatedIntegrations,
    totalIntegrations,
    pagination,
    onPageChange,
  }
}
