import type { ComponentProps } from 'react'
import type { Integration } from '@/schemas/integration'
import { useHistoryStore } from '@/stores/history.store'
import { useSelectedIntegrationStore } from '@/stores/select-integration.store'

type IntegrationCardProps = {
  integration: Integration
} & ComponentProps<'button'>

export function IntegrationCard({
  integration,
  ...props
}: IntegrationCardProps) {
  const { add } = useHistoryStore()
  const { select } = useSelectedIntegrationStore()

  const handleClick = () => {
    select(integration)
    add(integration)
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      className="flex aspect-square w-30 flex-col items-center justify-center rounded-lg border p-4 transition hover:scale-[1.03] hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary active:scale-95"
      {...props}
    >
      <img
        className="aspect-square w-10"
        src={integration.icon}
        alt={`${integration.name} icon`}
      />

      <span className="mt-2 truncate font-medium text-sm">
        {integration.name}
      </span>
    </button>
  )
}
