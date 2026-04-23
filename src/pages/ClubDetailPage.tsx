import { Link, useParams } from 'react-router-dom'
import { ClubDetailHeader } from '../components/ClubDetailHeader'
import { EmptyState } from '../components/EmptyState'
import { clubs } from '../data/clubs'
import { getSuggestedClubs } from '../lib/suggestions'
import type { ReaderProfile } from '../types'

interface ClubDetailPageProps {
  profile: ReaderProfile | null
}

export function ClubDetailPage({ profile }: ClubDetailPageProps) {
  const { clubId } = useParams()
  const club = clubs.find(({ id }) => id === clubId)

  if (!club) {
    return (
      <section className="section-shell">
        <EmptyState
          title="Ese club no existe en la demo"
          description="Vuelve al directorio y abre otra ficha para seguir navegando."
          ctaLabel="Ir al directorio"
          ctaTo="/"
        />
      </section>
    )
  }

  const relatedSuggestion = getSuggestedClubs([club], profile)[0]

  return (
    <section className="detail-layout section-shell">
      <div>
        <ClubDetailHeader club={club} />

        <div className="detail-card" style={{ marginTop: '24px' }}>
          <div className="section-header">
            <div className="section-kicker">Lo que ensenaria en demo</div>
            <h2>Una ficha lista para decidir si quieres entrar</h2>
            <p className="section-subtitle">
              El foco del MVP es que la persona vea contexto, proxima lectura y una
              llamada clara a la accion.
            </p>
          </div>

          <div className="detail-list">
            <div className="detail-row">
              <span>Tipo de experiencia</span>
              <strong>
                {club.modality === 'online'
                  ? 'Sesiones por videollamada'
                  : 'Encuentro en ciudad con aforo limitado'}
              </strong>
            </div>
            <div className="detail-row">
              <span>Ritmo</span>
              <strong>{club.pace}</strong>
            </div>
            <div className="detail-row">
              <span>Motivo para entrar</span>
              <strong>
                {club.genres[0]} + conversacion cuidada + siguiente libro visible
              </strong>
            </div>
          </div>
        </div>
      </div>

      <aside className="workspace-side">
        <section className="panel">
          <div className="section-header">
            <div className="section-kicker">Afinidad</div>
            <h2 className="section-title">Como encaja contigo</h2>
          </div>

          {!profile ? (
            <EmptyState
              title="Sin perfil lector"
              description="Completa tu perfil para justificar recomendaciones y ensenar personalizacion en la demo."
              ctaLabel="Ir a mi perfil"
              ctaTo="/perfil"
            />
          ) : relatedSuggestion ? (
            <div className="suggestion-item">
              <strong>Match detectado</strong>
              <p>Este club aparece bien posicionado para tu perfil actual.</p>
              <div className="suggestion-reasons">
                {relatedSuggestion.reasons.map((reason) => (
                  <span className="reason-pill" key={reason}>
                    {reason}
                  </span>
                ))}
              </div>
              <span className="suggestion-score">
                {relatedSuggestion.score} puntos de afinidad
              </span>
            </div>
          ) : (
            <EmptyState
              title="Club fuera de tus primeras sugerencias"
              description="La ficha sigue siendo navegable, pero no es de los que mejor puntuan con tu perfil actual."
            />
          )}
        </section>

        <section className="panel">
          <div className="section-header">
            <div className="section-kicker">Volver</div>
            <h2 className="section-title">Sigue explorando</h2>
            <p className="section-subtitle">
              El flujo pensado para el reto es entrar, comparar dos o tres clubes y cerrar la historia con el perfil.
            </p>
          </div>

          <Link className="button-primary" to="/">
            Volver al directorio
          </Link>
        </section>
      </aside>
    </section>
  )
}
