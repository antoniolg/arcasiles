import { useState } from 'react'
import { Link } from 'react-router-dom'
import { listClubs } from '../application/clubs/use-cases/listClubs'
import spainMapBackground from '../assets/spain-map-bg.png'
import type { Club } from '../domain/clubs/entities/Club'
import { clubRepository } from '../infrastructure/container'

interface CityMarker {
  city: string
  left: string
  top: string
}

interface CityCluster {
  city: string
  clubs: Club[]
  left: string
  top: string
}

const cityMarkers: CityMarker[] = [
  { city: 'A Coruna', left: '16%', top: '24%' },
  { city: 'Santiago', left: '19%', top: '28%' },
  { city: 'Bilbao', left: '56%', top: '28%' },
  { city: 'Zaragoza', left: '67%', top: '40%' },
  { city: 'Barcelona', left: '77%', top: '42%' },
  { city: 'Madrid', left: '52%', top: '52%' },
  { city: 'Valencia', left: '73%', top: '59%' },
  { city: 'Sevilla', left: '41%', top: '77%' },
  { city: 'Malaga', left: '45%', top: '88%' },
]

function buildCityClusters(clubs: Club[]): CityCluster[] {
  const clubsByCity = clubs.reduce<Record<string, Club[]>>((accumulator, club) => {
    if (club.city === 'Online') {
      return accumulator
    }

    accumulator[club.city] ??= []
    accumulator[club.city].push(club)
    return accumulator
  }, {})

  return cityMarkers
    .map((marker) => ({
      ...marker,
      clubs: clubsByCity[marker.city] ?? [],
    }))
    .filter((cluster) => cluster.clubs.length > 0)
}

export function SpainMapPage() {
  const clubs = listClubs(clubRepository)
  const cityClusters = buildCityClusters(clubs)
  const onlineClubs = clubs.filter((club) => club.city === 'Online')
  const [selectedCity, setSelectedCity] = useState(cityClusters[0]?.city ?? '')

  const selectedCluster =
    cityClusters.find((cluster) => cluster.city === selectedCity) ?? cityClusters[0] ?? null

  return (
    <div className="map-page">
      <section className="page-intro map-page-intro">
        <div className="section-kicker">Mapa lector</div>
        <h1 className="page-title">Explora los clubes de lectura por toda Espana</h1>
        <p className="page-copy map-page-copy">
          Una vista territorial para descubrir donde se esta leyendo ya, que ciudades
          concentran mas actividad y que clubes puedes abrir ahora mismo.
        </p>
      </section>

      <section className="map-overview">
        <div className="map-stat-card">
          <span>Ciudades activas</span>
          <strong>{cityClusters.length}</strong>
        </div>
        <div className="map-stat-card">
          <span>Clubes presenciales</span>
          <strong>{clubs.length - onlineClubs.length}</strong>
        </div>
        <div className="map-stat-card">
          <span>Comunidades online</span>
          <strong>{onlineClubs.length}</strong>
        </div>
      </section>

      <section className="spain-map-layout">
        <div className="spain-map-card">
          <div className="spain-map-copy">
            <div className="panel-kicker">Territorio</div>
            <h2 className="panel-title">Donde esta pasando</h2>
            <p className="panel-subtitle">
              Cada marcador agrupa los clubes disponibles en esa ciudad. Cuanto mas
              grande el circulo, mas actividad lectora hay ahi ahora mismo.
            </p>
          </div>

          <div className="spain-map-board">
            <div
              className="spain-map-backdrop"
              style={{ backgroundImage: `url(${spainMapBackground})` }}
              aria-hidden="true"
            />

            <div className="spain-map-points">
              {cityClusters.map((cluster) => (
                <button
                  key={cluster.city}
                  type="button"
                  className={
                    cluster.city === selectedCluster?.city
                      ? 'map-point is-active'
                      : 'map-point'
                  }
                  style={{ left: cluster.left, top: cluster.top }}
                  onClick={() => setSelectedCity(cluster.city)}
                  aria-pressed={cluster.city === selectedCluster?.city}
                  >
                    <span
                      className="map-point-core"
                      style={{
                        width: `${34 + cluster.clubs.length * 8}px`,
                      height: `${34 + cluster.clubs.length * 8}px`,
                      }}
                    />
                    <span className="map-point-label">
                      <span className="map-point-city">{cluster.city}</span>
                      <strong className="map-point-count">{cluster.clubs.length}</strong>
                    </span>
                  </button>
                ))}
              </div>

            <div className="map-legend" aria-hidden="true">
              <span className="map-legend-dot small" />
              <span>1-2 clubes</span>
              <span className="map-legend-dot medium" />
              <span>3-4 clubes</span>
              <span className="map-legend-dot large" />
              <span>5+ clubes</span>
            </div>
          </div>
        </div>

        <aside className="map-city-panel">
          <div className="panel-header">
            <div className="panel-kicker">Ciudades</div>
            <h2 className="panel-title">
              {selectedCluster ? selectedCluster.city : 'Sin seleccion'}
            </h2>
            <p className="panel-subtitle">
              {selectedCluster
                ? `${selectedCluster.clubs.length} clubes activos en esta ciudad.`
                : 'Selecciona una ciudad del mapa para ver sus clubes.'}
            </p>
          </div>

          <div className="map-city-list">
            {cityClusters.map((cluster) => (
              <button
                key={cluster.city}
                type="button"
                className={
                  cluster.city === selectedCluster?.city
                    ? 'map-city-item is-active'
                    : 'map-city-item'
                }
                onClick={() => setSelectedCity(cluster.city)}
              >
                <span>{cluster.city}</span>
                <strong>{cluster.clubs.length}</strong>
              </button>
            ))}
          </div>

          <div className="map-club-stack">
            {selectedCluster?.clubs.map((club) => (
              <Link key={club.id} to={`/club/${club.id}`} className="map-club-card">
                <div
                  className="map-club-thumb"
                  style={{ backgroundImage: `url(${club.imageUrl})` }}
                />
                <div className="map-club-body">
                  <div className="badge-row">
                    <span className="badge">{club.genres[0]}</span>
                    <span className="badge ghost">{club.pace}</span>
                  </div>
                  <h3>{club.name}</h3>
                  <p>{club.description}</p>
                  <div className="map-club-meta">
                    <span>{club.venue}</span>
                    <strong>{club.nextDate}</strong>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </section>

      <section className="online-clubs-panel">
        <div className="panel-header">
          <div className="panel-kicker">Tambien online</div>
          <h2 className="panel-title">Clubes que puedes unirte desde cualquier ciudad</h2>
          <p className="panel-subtitle">
            Para quienes prefieren flexibilidad, ritmo remoto o una comunidad repartida
            por toda Espana.
          </p>
        </div>

        <div className="online-clubs-grid">
          {onlineClubs.map((club) => (
            <Link key={club.id} to={`/club/${club.id}`} className="online-club-card">
              <strong>{club.name}</strong>
              <span>{club.genres.join(' · ')}</span>
              <p>{club.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
