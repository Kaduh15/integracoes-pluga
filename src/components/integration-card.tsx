import type { ComponentProps } from 'react'
import type { Integration } from '@/schemas/integration'

type IntegrationCardProps = {} & Integration & ComponentProps<'button'>

export function IntegrationCard({
  name,
  icon,
  ...props
}: IntegrationCardProps) {
  return (
    <button
      type="button"
      popoverTargetAction="toggle"
      popoverTarget={`modal`}
      className="container flex aspect-square w-30 flex-col items-center rounded-lg border p-4"
      {...props}
    >
      <img className="aspect-square min-w-10" src={icon} alt={`${name} icon`} />

      <span className="mt-2 font-medium text-xl">{name}</span>
    </button>
  )
}
