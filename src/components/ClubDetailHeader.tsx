import type { Club } from '../domain/clubs/entities/Club'

interface ClubDetailHeaderProps {
  club: Club
  hasRequested: boolean
  onRequestJoin: () => void
}

export function ClubDetailHeader({ club, hasRequested, onRequestJoin }: ClubDetailHeaderProps) {
  return (
    <section className="detail-hero">
      <div className="detail-card">
        <div className="section-header">
          <div className="section-kicker">Ficha del club</div>
          <h1 className="page-title">{club.name}</h1>
          <p className="page-copy">{club.description}</p>
        </div>

        <div className="detail-stat-grid">
          <div className="detail-stat">
            <span>{club.modality === 'online' ? 'Online' : 'Presencial'}</span>
            <strong>{club.city}, Espana</strong>
          </div>
          <div className="detail-stat">
            <span>{club.members} miembros</span>
            <strong>Grupo activo</strong>
          </div>
          <div className="detail-stat">
            <span>{club.genres[0]}</span>
            <strong>Genero principal</strong>
          </div>
        </div>

        <div className="detail-list">
          <div className="detail-row">
            <span>Proxima lectura</span>
            <strong>{club.nextBook}</strong>
          </div>
          <div className="detail-row">
            <span>Sesion</span>
            <strong>{club.nextDate}</strong>
          </div>
          <div className="detail-row">
            <span>Ubicacion</span>
            <strong>{club.venue}</strong>
          </div>
          <div className="detail-row">
            <span>Organiza</span>
            <strong>{club.hostName}</strong>
          </div>
        </div>

        <div className="detail-cta">
          <button
            type="button"
            className="button-primary"
            onClick={onRequestJoin}
            disabled={hasRequested}
          >
            {hasRequested ? 'Solicitud enviada' : 'Solicitar unirse'}
          </button>
          <button type="button" className="button-secondary">
            Guardar club
          </button>
        </div>
      </div>

      <div className="detail-poster">
        <div
          className="detail-poster-image"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(22, 18, 31, 0.08), rgba(22, 18, 31, 0.28)), url(${club.imageUrl})`,
          }}
        >
          <span>1/6</span>
        </div>
      </div>

      <div className="detail-side-panel">
        <div className="detail-side-block">
          <h3>Sobre el club</h3>
          <p>{club.about}</p>
          <a href="#sobre-nosotros">Ver mas</a>
        </div>

        <div className="detail-side-block detail-book-block">
          <h3>Proxima lectura</h3>
          <div className="detail-book-card">
            <div
              className="detail-book-cover"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(31, 25, 43, 0.18), rgba(31, 25, 43, 0.4)), url(${club.imageUrl})`,
              }}
            />
            <div>
              <strong>{club.nextBook}</strong>
              <span>{club.genres[0]}</span>
            </div>
          </div>
        </div>

        <div className="detail-side-block detail-host-block">
          <h3>Organiza</h3>
          <div className="detail-host">
            <span className="detail-host-avatar">{club.hostName.charAt(0)}</span>
            <div>
              <strong>{club.hostName}</strong>
              <span>Creadora del club</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
