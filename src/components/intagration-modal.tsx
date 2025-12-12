import type { ComponentProps } from 'react'

type IntegrationModalProps = {
  name: string
  icon: string
} & ComponentProps<'div'>

export function IntegrationModal({
  name,
  icon,
  ...props
}: IntegrationModalProps) {
  return (
    <div
      popover="auto"
      id={`modal`}
      className="m-auto w-full max-w-sm rounded-lg border p-4 shadow-lg"
      {...props}
    >
      <img className="aspect-square min-w-10" src={icon} alt={`${name} icon`} />

      <span className="mt-2 font-medium text-xl">{name}</span>
    </div>
  )
}
