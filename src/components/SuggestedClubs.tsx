import { Link } from 'react-router-dom'
import { clubs } from '../data/clubs'
import type { ReaderProfile, SuggestionResult } from '../types'
import { EmptyState } from './EmptyState'

interface SuggestedClubsProps {
  profile: ReaderProfile | null
  suggestions: SuggestionResult[]
}

export function SuggestedClubs({ profile, suggestions }: SuggestedClubsProps) {
  return (
    <section className="panel suggested-panel">
      <div className="section-header">
        <div className="section-kicker">Para ti</div>
        <h2 className="section-title">Sugerencias condicionadas por tu perfil</h2>
        <p className="section-subtitle">
          Simulamos recomendacion inteligente con reglas explicables para la demo.
        </p>
      </div>

      {!profile ? (
        <EmptyState
          title="Activa tu perfil lector"
          description="Elige generos, modalidad y ciudad para priorizar los clubes mas cercanos a tu gusto."
          ctaLabel="Completar perfil"
          ctaTo="/perfil"
        />
      ) : suggestions.length === 0 ? (
        <EmptyState
          title="Todavia no hay match fuerte"
          description="Tu perfil esta guardado, pero ahora mismo no coincide con los clubes cargados. Cambia una preferencia para ver resultados."
          ctaLabel="Editar perfil"
          ctaTo="/perfil"
        />
      ) : (
        <div className="suggestion-list">
          {suggestions.map((suggestion) => {
            const club = clubs.find(({ id }) => id === suggestion.clubId)

            if (!club) {
              return null
            }

            return (
              <Link key={suggestion.clubId} className="suggestion-item" to={`/club/${club.id}`}>
                <strong>{club.name}</strong>
                <p>
                  {club.city} · {club.modality} · {club.nextBook}
                </p>

                <div className="suggestion-reasons">
                  {suggestion.reasons.map((reason) => (
                    <span className="reason-pill" key={reason}>
                      {reason}
                    </span>
                  ))}
                </div>

                <span className="suggestion-score">{suggestion.score} puntos de afinidad</span>
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}
