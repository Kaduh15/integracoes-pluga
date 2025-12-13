import type { ComponentProps } from 'react'
import type { Integration } from '@/schemas/integration'
import { useHistoryStore } from '@/state/history.store'
import { useSelectedIntegrationStore } from '@/state/select-integration.store'

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
      popoverTargetAction="toggle"
      popoverTarget={`modal`}
      className="flex aspect-square w-30 flex-col items-center justify-center rounded-lg border p-4"
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
