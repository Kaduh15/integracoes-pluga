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
      className="group flex cursor-pointer items-center justify-center gap-4 rounded-lg border p-4 transition hover:scale-[1.03] hover:border-blue-400 hover:bg-[#ecf8fe] hover:shadow-md active:scale-95"
      {...props}
    >
      <div
        style={
          {
            '--bg': integration.color,
          } as React.CSSProperties
        }
        className={`flex aspect-square h-12 items-center justify-center rounded-full bg-(--bg) p-2`}
      >
        <img
          className="aspect-square w-10"
          src={integration.icon}
          alt={`${integration.name} icon`}
        />
      </div>

      <span className="flex-1 truncate text-wrap text-start font-semibold text-sm group-hover:text-black">
        {integration.name}
      </span>
    </button>
  )
}
