import { Link } from 'react-router-dom'

interface EmptyStateProps {
  title: string
  description: string
  ctaLabel?: string
  ctaTo?: string
}

export function EmptyState({
  title,
  description,
  ctaLabel,
  ctaTo,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{description}</p>
      {ctaLabel && ctaTo ? (
        <Link className="button-secondary" to={ctaTo}>
          {ctaLabel}
        </Link>
      ) : null}
    </div>
  )
}
