import { X } from 'lucide-react'
import type { ComponentProps } from 'react'
import { useHistoryStore } from '@/stores/history.store'
import { useSelectedIntegrationStore } from '@/stores/select-integration.store'

type IntegrationModalProps = ComponentProps<'div'>

export function IntegrationModal({ ...props }: IntegrationModalProps) {
  const { items } = useHistoryStore()
  const { selected, clear } = useSelectedIntegrationStore()

  if (!selected) {
    return null
  }

  return (
    <div
      role="dialog"
      aria-label="modal"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <button
        type="button"
        onClick={clear}
        className="absolute inset-0 bg-black/50"
        aria-label="Close modal"
      />

      <div
        className="relative z-10 w-full max-w-sm rounded-lg border bg-background p-4 shadow-xl"
        {...props}
      >
        <button
          type="button"
          onClick={clear}
          className="absolute top-3 right-3 rounded p-1 text-muted-foreground hover:bg-muted"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3">
          <img
            className="aspect-square w-10"
            src={selected.icon}
            alt={`${selected.name} icon`}
          />
          <span className="font-medium text-xl">{selected.name}</span>
        </div>

        <a
          href={selected.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block rounded-md bg-primary px-4 py-2 text-center font-medium text-primary-foreground hover:opacity-90"
        >
          Acessar integração
        </a>

        <div className="mt-6">
          <h2 className="mb-2 font-semibold text-lg">Histórico de acessos</h2>
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
    </div>
  )
}
