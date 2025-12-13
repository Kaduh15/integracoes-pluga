import type { ComponentProps } from 'react'
import { useHistoryStore } from '@/state/history.store'
import { useSelectedIntegrationStore } from '@/state/select-integration.store'

type IntegrationModalProps = ComponentProps<'div'>

export function IntegrationModal({ ...props }: IntegrationModalProps) {
  const { items } = useHistoryStore()
  const { selected } = useSelectedIntegrationStore()

  if (!selected) {
    return null
  }

  return (
    <div
      popover="auto"
      id={`modal`}
      className="m-auto w-full max-w-sm rounded-lg border p-4 shadow-lg"
      {...props}
    >
      <div>
        <img
          className="aspect-square min-w-10"
          src={selected.icon}
          alt={`${selected.name} icon`}
        />

        <span className="mt-2 font-medium text-xl">{selected.name}</span>
      </div>

      <div>
        <h2 className="mt-4 mb-2 font-semibold text-lg">
          Histórico de Acessos
        </h2>
        <ul className="max-h-48 space-y-2 overflow-y-auto">
          {items.map((historyItem) => (
            <li key={historyItem.name} className="flex items-center gap-2">
              <img
                className="aspect-square w-6"
                src={historyItem.icon}
                alt={`${historyItem.name} icon`}
              />
              <span className="font-medium">{historyItem.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
