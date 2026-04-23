import { Link } from 'react-router-dom'
import type { Club } from '../domain/clubs/entities/Club'
import { Badge } from './Badge'

interface ClubCardProps {
  club: Club
}

export function ClubCard({ club }: ClubCardProps) {
  return (
    <Link className="club-card" to={`/club/${club.id}`} data-poster={club.image}>
      <div
        className="club-card-cover"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(24, 18, 35, 0.1), rgba(24, 18, 35, 0.55)), url(${club.imageUrl})`,
        }}
      >
        <Badge tone={club.modality === 'online' ? 'default' : 'warm'}>
          {club.modality === 'presencial' ? 'Presencial' : 'Online'}
        </Badge>
      </div>

      <div className="club-card-body">
        <h3 className="club-card-title">{club.name}</h3>
        <div className="club-card-city">
          <span>{club.city === 'Online' ? 'Online' : `${club.city}, Espana`}</span>
          <span>{club.members} miembros</span>
        </div>

        <div className="badge-row">
          <Badge tone="ghost">{club.genres[0]}</Badge>
        </div>

        <p className="club-card-copy">{club.description}</p>

        <div className="club-card-footer">
          <div>
            <strong>Proxima reunion</strong>
            <div>{club.nextDate}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
