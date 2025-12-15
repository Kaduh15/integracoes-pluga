import { X } from 'lucide-react'
import { Activity, type ComponentProps } from 'react'
import { useHistoryStore } from '@/stores/history.store'
import { useSelectedIntegrationStore } from '@/stores/select-integration.store'

type IntegrationModalProps = ComponentProps<'div'>

export function IntegrationModal({ ...props }: IntegrationModalProps) {
  const { items } = useHistoryStore()
  const { selected, clear } = useSelectedIntegrationStore()

  const recentItems = items.slice(1, 4)

  return (
    <div
      role="dialog"
      aria-label="modal"
      popover="auto"
      className="h-dvh w-full bg-black/50"
      id="integration-modal"
    >
      <button
        type="button"
        onClick={clear}
        aria-label="Close modal"
        popoverTarget="integration-modal"
        className="-z-10 fixed top-0 left-0 h-dvh w-full"
      />

      <div
        className="relative m-auto mt-60 max-w-sm rounded-lg border bg-background p-4 shadow-xl"
        {...props}
      >
        <button
          type="button"
          onClick={clear}
          className="absolute top-3 right-3 rounded p-1 text-muted-foreground hover:bg-muted"
          popoverTarget="integration-modal"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3">
          <img
            style={
              {
                '--bg': selected?.color,
              } as React.CSSProperties
            }
            className="aspect-square w-20 rounded-full bg-(--bg) p-2"
            src={selected?.icon}
            alt={`${selected?.name} icon`}
          />
          <span className="font-medium text-xl">{selected?.name}</span>
        </div>

        <a
          href={selected?.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block rounded-md bg-primary px-4 py-2 text-center font-medium text-primary-foreground hover:opacity-90"
        >
          Acessar integração
        </a>

        <div className="mt-6">
          <h2 className="mb-2 font-semibold text-lg">Histórico de acessos</h2>
          <ul className="max-h-48 space-y-2 overflow-y-auto">
            <Activity mode={recentItems.length === 0 ? 'visible' : 'hidden'}>
              Nenhum acesso recente.
            </Activity>
            <Activity mode={recentItems.length > 0 ? 'visible' : 'hidden'}>
              {recentItems.map((historyItem) => (
                <li
                  key={historyItem.name}
                  className="flex w-fit items-center gap-2 rounded-xl border-b border-l p-2 transition hover:bg-accent/50"
                >
                  <img
                    style={
                      {
                        '--bg': historyItem.color,
                      } as React.CSSProperties
                    }
                    className="aspect-square w-8 rounded-full bg-(--bg) p-2"
                    src={historyItem.icon}
                    alt={`${historyItem.name} icon`}
                  />
                  <a
                    href={historyItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-sm underline-offset-2 hover:underline"
                  >
                    {historyItem.name}
                  </a>
                </li>
              ))}
            </Activity>
          </ul>
        </div>
      </div>
    </div>
  )
}
