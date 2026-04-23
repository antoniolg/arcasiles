import { useState } from 'react'
import { ClubGrid } from '../components/ClubGrid'
import { FilterBar } from '../components/FilterBar'
import { Hero } from '../components/Hero'
import { SuggestedClubs } from '../components/SuggestedClubs'
import { availableCities, availableGenres, clubs } from '../data/clubs'
import { getSuggestedClubs } from '../lib/suggestions'
import type { FilterState, ReaderProfile } from '../types'

interface HomePageProps {
  profile: ReaderProfile | null
}

const initialFilters: FilterState = {
  modality: 'all',
  city: 'all',
  genre: 'all',
}

export function HomePage({ profile }: HomePageProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters)

  const filteredClubs = clubs.filter((club) => {
    const matchesModality =
      filters.modality === 'all' || club.modality === filters.modality
    const matchesCity = filters.city === 'all' || club.city === filters.city
    const matchesGenre =
      filters.genre === 'all' || club.genres.includes(filters.genre)

    return matchesModality && matchesCity && matchesGenre
  })

  const suggestions = getSuggestedClubs(clubs, profile)

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
          <SuggestedClubs profile={profile} suggestions={suggestions} />
        </aside>
      </section>
    </>
  )
}
