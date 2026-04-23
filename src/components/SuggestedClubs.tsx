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
        <div className="section-kicker">Sugerencias para ti</div>
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
                <div
                  className="suggestion-thumb"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(18, 13, 28, 0.08), rgba(18, 13, 28, 0.32)), url(${club.imageUrl})`,
                  }}
                />

                <div className="suggestion-content">
                  <strong>{club.name}</strong>
                  <p>
                    {club.city}, {club.city === 'Online' ? 'Online' : 'Espana'} ·{' '}
                    {club.modality === 'online' ? 'Online' : 'Presencial'}
                  </p>

                  <span className="suggestion-meta">{club.members} miembros</span>

                  <div className="suggestion-reasons">
                    <span className="reason-pill">{club.genres[0]}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      <button type="button" className="button-secondary sidebar-button">
        Ver mas sugerencias
      </button>

      <Link to="/perfil" className="profile-callout">
        <div>
          <p>
            Cuentanos que te gusta leer y te recomendaremos mejores clubes.
          </p>
          <strong>Crear mi perfil lector</strong>
        </div>
        <div className="mini-mascot" aria-hidden="true">
          <div className="mini-mascot-head"></div>
          <div className="mini-mascot-book"></div>
        </div>
      </Link>
    </section>
  )
}
