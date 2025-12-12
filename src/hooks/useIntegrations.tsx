import { useQuery } from '@tanstack/react-query'
import { getIntegrations } from '@/http/functions/get-integrations'

export function useIntegrations() {
  const { data: integrations, isLoading } = useQuery({
    queryKey: ['integrations'],
    queryFn: getIntegrations,
    initialData: [],
  })

  return {
    integrations,
    isLoading,
  }
}
