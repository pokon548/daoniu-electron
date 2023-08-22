import { Steps } from '@phosphor-icons/react'

interface Props {
  title: string
}

export function LiuchengTab({ title }: Props): JSX.Element {
  return (
    <div className="flex place-items-center select-none">
      <Steps weight="duotone" className="text-white" />

      <div className="pl-2 truncate dark:text-white">{title}</div>
    </div>
  )
}
