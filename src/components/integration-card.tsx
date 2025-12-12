import type { ComponentProps } from 'react'
import type { Integration } from '@/schemas/integration'
import { useHistoryViewerStore } from '@/state/history-viwer-store'
import { useModalStore } from '@/state/modal-store'

type IntegrationCardProps = {} & Integration & ComponentProps<'button'>

export function IntegrationCard({
  name,
  icon,
  ...props
}: IntegrationCardProps) {
  const { addHistory } = useHistoryViewerStore(({ actions }) => actions)
  const { addData } = useModalStore(({ actions }) => actions)



  return (
    <button
      onClick={() => {
        addHistory({ name, icon })
        addData({ name, icon })
      }}
      type="button"
      popoverTargetAction="toggle"
      popoverTarget={`modal`}
      className="flex aspect-square w-30 flex-col items-center justify-center rounded-lg border p-4"
      {...props}
    >
      <img className="aspect-square w-10" src={icon} alt={`${name} icon`} />

      <span className="mt-2 truncate font-medium text-sm">{name}</span>
    </button>
  )
}
