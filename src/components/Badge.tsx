import type { PropsWithChildren } from 'react'

interface BadgeProps extends PropsWithChildren {
  tone?: 'default' | 'warm' | 'ghost'
}

export function Badge({ children, tone = 'default' }: BadgeProps) {
  const className = tone === 'default' ? 'badge' : `badge ${tone}`
  return <span className={className}>{children}</span>
}
