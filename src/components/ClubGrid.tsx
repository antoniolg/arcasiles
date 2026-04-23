import type { Club } from '../types'
import { ClubCard } from './ClubCard'
import { EmptyState } from './EmptyState'

interface ClubGridProps {
  clubs: Club[]
}

export function ClubGrid({ clubs }: ClubGridProps) {
  if (clubs.length === 0) {
    return (
      <EmptyState
        title="No hay clubes con esa combinacion"
        description="Prueba otra ciudad, abre modalidad o elimina el genero para volver a ensanchar el directorio."
      />
    )
  }

  return (
    <div className="club-grid">
      {clubs.map((club) => (
        <ClubCard key={club.id} club={club} />
      ))}
    </div>
  )
}
