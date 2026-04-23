import { Link } from 'react-router-dom'
import type { Club } from '../types'
import { Badge } from './Badge'

interface ClubCardProps {
  club: Club
}

export function ClubCard({ club }: ClubCardProps) {
  return (
    <Link className="club-card" to={`/club/${club.id}`} data-poster={club.image}>
      <div className="club-card-top">
        <div>
          <h3 className="club-card-title">{club.name}</h3>
          <div className="club-card-city">
            {club.modality === 'online' ? 'Comunidad online' : club.city}
          </div>
        </div>

        <Badge tone={club.modality === 'online' ? 'default' : 'warm'}>
          {club.modality}
        </Badge>
      </div>

      <div className="club-poster" aria-hidden="true">
        <span>{club.image}</span>
      </div>

      <p className="club-card-copy">{club.description}</p>

      <div className="badge-row">
        {club.genres.slice(0, 2).map((genre) => (
          <Badge key={genre} tone="ghost">
            {genre}
          </Badge>
        ))}
      </div>

      <div className="club-card-footer">
        <div>
          <strong>Proxima lectura</strong>
          <div>{club.nextBook}</div>
        </div>
        <Badge tone="warm">{club.nextDate}</Badge>
      </div>
    </Link>
  )
}
