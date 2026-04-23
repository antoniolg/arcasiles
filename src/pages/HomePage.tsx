import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ClubDetailHeader } from '../components/ClubDetailHeader'
import { ClubGrid } from '../components/ClubGrid'
import { FilterBar } from '../components/FilterBar'
import { Hero } from '../components/Hero'
import { SuggestedClubs } from '../components/SuggestedClubs'
import type { ClubFilters } from '../domain/clubs/value-objects/ClubFilters'
import type { ReaderProfile } from '../domain/profiles/entities/ReaderProfile'
import { useClubCatalog } from '../presentation/hooks/useClubCatalog'

interface HomePageProps {
  profile: ReaderProfile | null
}

const initialFilters: ClubFilters = {
  modality: 'all',
  city: 'all',
  genre: 'all',
}

export function HomePage({ profile }: HomePageProps) {
  const [filters, setFilters] = useState<ClubFilters>(initialFilters)
  const {
    clubs,
    filteredClubs,
    suggestions,
    availableCities,
    availableGenres,
    featuredClub,
  } = useClubCatalog(filters, profile)

  return (
    <>
      <Hero clubsCount={clubs.length} profile={profile} />

      <section className="workspace section-shell">
        <div className="workspace-main">
          <FilterBar
            filters={filters}
            cities={availableCities}
            genres={availableGenres}
            visibleCount={filteredClubs.length}
            totalCount={clubs.length}
            onChange={setFilters}
          />

          <ClubGrid clubs={filteredClubs} />
        </div>

        <aside className="workspace-side">
          <SuggestedClubs
            clubsById={new Map(clubs.map((club) => [club.id, club]))}
            profile={profile}
            suggestions={suggestions}
          />
        </aside>
      </section>

      {featuredClub ? (
        <section className="home-preview section-shell">
          <ClubDetailHeader club={featuredClub} />
        </section>
      ) : null}

      <section className="profile-preview section-shell" id="como-funciona">
        <div className="profile-preview-copy">
          <div className="section-kicker">Perfil lector</div>
          <h2 className="panel-title">Cuentanos que te gusta leer</h2>
          <p className="panel-subtitle">
            Personaliza tu perfil y recibe recomendaciones de clubes y lecturas que
            encajan contigo.
          </p>

          <div className="profile-preview-actions">
            <Link className="button-primary" to="/perfil">
              Crear mi perfil lector
            </Link>
          </div>
        </div>

        <div className="profile-preview-features">
          <div className="profile-preview-feature">
            <strong>Cuestionario rapido</strong>
            <span>Descubre tus gustos en 3 minutos.</span>
          </div>
          <div className="profile-preview-feature">
            <strong>Recomendaciones personalizadas</strong>
            <span>Clubes y lecturas hechas para ti.</span>
          </div>
          <div className="profile-preview-feature">
            <strong>Tu actividad</strong>
            <span>Sigue tus clubes, lecturas y conversaciones.</span>
          </div>
        </div>

        <div className="profile-preview-art" aria-hidden="true">
          <img
            className="profile-preview-image"
            src="/mascots/artichoke-read.png"
            alt=""
          />
        </div>
      </section>

      <section className="community-band section-shell" id="sobre-nosotros">
        <div className="community-copy">
          <h2>Las mejores historias se comparten.</h2>
          <p>
            Unete a miles de personas que ya leen juntas.
          </p>
          <a className="button-secondary light" href="#directorio">
            Explorar clubes
          </a>
        </div>

        <div className="community-center" aria-hidden="true">
          <span>B</span>
        </div>

        <div className="community-stats">
          <div className="avatar-row">
            <span className="avatar-chip">L</span>
            <span className="avatar-chip">A</span>
            <span className="avatar-chip">N</span>
            <span className="avatar-chip">R</span>
            <span className="avatar-chip">M</span>
          </div>
          <strong>+12K personas conectadas a traves de la lectura</strong>
        </div>
      </section>
    </>
  )
}
