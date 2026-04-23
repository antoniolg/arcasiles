import type { Club } from '../types'
import { Badge } from './Badge'

interface ClubDetailHeaderProps {
  club: Club
}

export function ClubDetailHeader({ club }: ClubDetailHeaderProps) {
  return (
    <section className="detail-hero">
      <div className="detail-card">
        <div className="section-header">
          <div className="section-kicker">Ficha del club</div>
          <h1 className="page-title">{club.name}</h1>
          <p className="page-copy">{club.description}</p>
        </div>

        <div className="badge-row">
          <Badge tone={club.modality === 'online' ? 'default' : 'warm'}>
            {club.modality}
          </Badge>
          <Badge tone="ghost">{club.city}</Badge>
          <Badge tone="ghost">{club.pace}</Badge>
          {club.genres.map((genre) => (
            <Badge key={genre} tone="ghost">
              {genre}
            </Badge>
          ))}
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
            <span>Persona anfitriona</span>
            <strong>{club.hostName}</strong>
          </div>
          <div className="detail-row">
            <span>Plazas disponibles</span>
            <strong>{club.spotsLeft}</strong>
          </div>
        </div>

        <div className="detail-cta">
          <button type="button" className="button-primary">
            Solicitar unirse
          </button>
          <button type="button" className="button-secondary">
            Me interesa
          </button>
        </div>
      </div>

      <div className="detail-poster" aria-hidden="true">
        <span>{club.image}</span>
      </div>
    </section>
  )
}
