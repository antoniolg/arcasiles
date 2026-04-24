import { type FormEvent, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ClubDetailHeader } from '../components/ClubDetailHeader'
import { EmptyState } from '../components/EmptyState'
import type { ReaderProfile } from '../domain/profiles/entities/ReaderProfile'
import { useClubDetail } from '../presentation/hooks/useClubDetail'

interface ClubDetailPageProps {
  profile: ReaderProfile | null
}

interface MockJoinRequest {
  clubId: string
  attendeeName: string
  message: string
  requestedAt: string
}

const JOIN_REQUESTS_STORAGE_KEY = 'arcasiles.mock-join-requests'

function loadJoinRequests(): MockJoinRequest[] {
  if (typeof window === 'undefined') {
    return []
  }

  const stored = window.localStorage.getItem(JOIN_REQUESTS_STORAGE_KEY)

  if (!stored) {
    return []
  }

  try {
    const parsed = JSON.parse(stored) as MockJoinRequest[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveJoinRequests(requests: MockJoinRequest[]): void {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(JOIN_REQUESTS_STORAGE_KEY, JSON.stringify(requests))
}

function formatJoinDate(value: string): string {
  try {
    const date = new Date(value)
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return value
  }
}

export function ClubDetailPage({ profile }: ClubDetailPageProps) {
  const { clubId } = useParams()
  const { club, relatedSuggestion } = useClubDetail(clubId, profile)
  const [joinRequests, setJoinRequests] = useState<MockJoinRequest[]>(() => loadJoinRequests())
  const [isJoinFlowOpen, setIsJoinFlowOpen] = useState(false)
  const [attendeeName, setAttendeeName] = useState('')
  const [message, setMessage] = useState('')
  const [requestError, setRequestError] = useState('')

  const currentRequest = club ? joinRequests.find((request) => request.clubId === club.id) : null
  const affinityProgress = relatedSuggestion ? Math.min(100, relatedSuggestion.score * 22) : 0

  useEffect(() => {
    saveJoinRequests(joinRequests)
  }, [joinRequests])

  const handleRequestSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setRequestError('')

    if (!club) {
      return
    }

    if (!attendeeName.trim()) {
      setRequestError('Cuéntanos tu nombre para personalizar la solicitud.')
      return
    }

    const request: MockJoinRequest = {
      clubId: club.id,
      attendeeName: attendeeName.trim(),
      message: message.trim() || 'Me gustaría unirme para ampliar mi circuito de lectura.',
      requestedAt: new Date().toISOString(),
    }

    setJoinRequests((currentRequests) => [
      ...currentRequests.filter((item) => item.clubId !== club.id),
      request,
    ])
    setIsJoinFlowOpen(false)
    setMessage('')
    setAttendeeName('')
  }

  const handleCancelRequest = () => {
    if (!club) {
      return
    }

    setJoinRequests((currentRequests) => currentRequests.filter((item) => item.clubId !== club.id))
  }

  const handleEditRequest = () => {
    if (!currentRequest) {
      return
    }

    setAttendeeName(currentRequest.attendeeName)
    setMessage(currentRequest.message)
    setRequestError('')
    setIsJoinFlowOpen(true)
  }

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
  return (
    <section className="detail-layout section-shell">
      <div>
        <ClubDetailHeader
          club={club}
          hasRequested={Boolean(currentRequest)}
          onRequestJoin={() => setIsJoinFlowOpen(true)}
        />

        <div className="detail-card detail-experience-card">
          <div className="section-header">
            <div className="section-kicker">Experiencia</div>
            <h2>Antes de entrar</h2>
            <p className="section-subtitle">
              Lo importante de este club en una lectura rapida.
            </p>
          </div>

          <div className="experience-grid">
            <div className="experience-item">
              <span>Tipo de experiencia</span>
              <strong>
                {club.modality === 'online'
                  ? 'Sesiones por videollamada'
                  : 'Encuentro en ciudad con aforo limitado'}
              </strong>
            </div>
            <div className="experience-item">
              <span>Ritmo</span>
              <strong>{club.pace}</strong>
            </div>
            <div className="experience-item">
              <span>Lo diferencial</span>
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
            <p className="section-subtitle">
              Match calculado con tu ciudad, modalidad y generos favoritos.
            </p>
          </div>

          {!profile ? (
            <EmptyState
              title="Sin perfil lector"
              description="Completa tu perfil para justificar recomendaciones y ensenar personalizacion en la demo."
              ctaLabel="Ir a mi perfil"
              ctaTo="/perfil"
            />
          ) : relatedSuggestion ? (
            <div className="affinity-card">
              <div className="affinity-card-top">
                <div>
                  <strong className="affinity-eyebrow">Match detectado</strong>
                  <p className="affinity-copy">
                    Buen encaje para tu perfil lector actual.
                  </p>
                </div>

                <div className="affinity-score-block">
                  <span className="affinity-score-value">{relatedSuggestion.score}</span>
                  <span className="affinity-score-label">puntos de afinidad</span>
                </div>
              </div>

              <div className="affinity-meter" aria-hidden="true">
                <span style={{ width: `${affinityProgress}%` }} />
              </div>

              <div className="affinity-reasons">
                {relatedSuggestion.reasons.map((reason) => (
                  <div className="affinity-reason" key={reason}>
                    <span className="affinity-reason-dot" aria-hidden="true" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
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
            <div className="section-kicker">Solicitud</div>
            <h2 className="section-title">Unirte al club</h2>
            <p className="section-subtitle">
              Deja una nota breve para que la organizacion pueda responderte.
            </p>
          </div>

          {currentRequest ? (
            <div className="join-status-card">
              <div className="join-status-head">
                <span className="join-status-dot" aria-hidden="true" />
                <div>
                  <strong>Solicitud enviada</strong>
                  <span>La organizacion tiene tus datos de contacto.</span>
                </div>
              </div>

              <div className="detail-list compact-list">
              <div className="detail-row">
                <span>Nombre</span>
                <strong>{currentRequest.attendeeName}</strong>
              </div>
              <div className="detail-row">
                <span>Mensaje</span>
                <strong>{currentRequest.message}</strong>
              </div>
              <div className="detail-row">
                <span>Fecha</span>
                <strong>{formatJoinDate(currentRequest.requestedAt)}</strong>
              </div>
              </div>

              <div className="join-actions">
                <button type="button" className="button-primary" onClick={handleEditRequest}>
                  Editar solicitud
                </button>
                <button type="button" className="button-secondary" onClick={handleCancelRequest}>
                  Quitar
                </button>
              </div>
            </div>
          ) : (
            <div>
              {!isJoinFlowOpen ? (
                <button type="button" className="button-primary" onClick={() => setIsJoinFlowOpen(true)}>
                  Solicitar plaza
                </button>
              ) : (
                <form onSubmit={handleRequestSubmit} className="join-form">
                  <label>
                    Tu nombre
                    <input
                      type="text"
                      value={attendeeName}
                      onChange={(event) => setAttendeeName(event.target.value)}
                      placeholder="Ej: Ana Ruiz"
                      className="join-input"
                      required
                    />
                  </label>
                  <label>
                    Mensaje breve para la comunidad
                    <textarea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder="Dime por qué te apetece unirte..."
                      rows={3}
                      className="join-input"
                    />
                  </label>

                  {requestError ? <p className="form-error">{requestError}</p> : null}

                  <div className="join-actions">
                    <button type="submit" className="button-primary">
                      Enviar solicitud
                    </button>
                    <button type="button" className="button-secondary" onClick={() => setIsJoinFlowOpen(false)}>
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </section>

        <section className="panel">
          <div className="section-header">
            <div className="section-kicker">Volver</div>
            <h2 className="section-title">Sigue explorando</h2>
            <p className="section-subtitle">
              El flujo pensado para el reto es entrar, comparar dos o tres clubes y volver al directorio con una decision clara.
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
