import { useState } from 'react'
import type { Pace } from '../domain/clubs/entities/Club'
import type {
  ReaderModalityPreference,
  ReaderProfile,
} from '../domain/profiles/entities/ReaderProfile'

interface ProfileFormProps {
  cities: string[]
  genres: string[]
  profile: ReaderProfile | null
  onSave: (profile: ReaderProfile) => void
}

const emptyProfile: ReaderProfile = {
  favoriteGenres: [],
  preferredModality: 'indiferente',
  city: '',
  pace: 'mensual',
}

export function ProfileForm({ cities, genres, profile, onSave }: ProfileFormProps) {
  const [draft, setDraft] = useState<ReaderProfile>(profile ?? emptyProfile)

  const toggleGenre = (genre: string) => {
    setDraft((current) => {
      const isSelected = current.favoriteGenres.includes(genre)

      return {
        ...current,
        favoriteGenres: isSelected
          ? current.favoriteGenres.filter((item) => item !== genre)
          : [...current.favoriteGenres, genre],
      }
    })
  }

  return (
    <form
      className="profile-panel"
      onSubmit={(event) => {
        event.preventDefault()
        onSave(draft)
      }}
    >
      <div className="section-header">
        <div className="section-kicker">Perfil lector</div>
        <h2>Cuentanos que te gusta leer</h2>
        <p className="section-subtitle">
          Personaliza tu perfil y recibe recomendaciones de clubes y lecturas que encajan contigo.
        </p>
      </div>

      <div className="profile-grid">
        <div className="profile-group full">
          <label className="profile-label">Generos favoritos</label>
          <div className="checkbox-grid">
            {genres.map((genre) => (
              <label className="checkbox-pill" key={genre}>
                <input
                  type="checkbox"
                  checked={draft.favoriteGenres.includes(genre)}
                  onChange={() => toggleGenre(genre)}
                />
                <span>{genre}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="profile-group">
          <label className="profile-label" htmlFor="modality-preference">
            Modalidad preferida
          </label>
          <select
            id="modality-preference"
            className="profile-control"
            value={draft.preferredModality}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                preferredModality: event.target.value as ReaderModalityPreference,
              }))
            }
          >
            <option value="indiferente">Indiferente</option>
            <option value="online">Online</option>
            <option value="presencial">Presencial</option>
          </select>
        </div>

        <div className="profile-group">
          <label className="profile-label" htmlFor="pace">
            Ritmo
          </label>
          <select
            id="pace"
            className="profile-control"
            value={draft.pace}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                pace: event.target.value as Pace,
              }))
            }
          >
            <option value="mensual">Mensual</option>
            <option value="quincenal">Quincenal</option>
          </select>
        </div>

        <div className="profile-group full">
          <label className="profile-label" htmlFor="city-preference">
            Ciudad
          </label>
          <select
            id="city-preference"
            className="profile-control"
            value={draft.city}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                city: event.target.value,
              }))
            }
          >
            <option value="">Sin preferencia</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="profile-actions">
        <button type="submit" className="button-primary">
          Guardar perfil
        </button>
        <button
          type="button"
          className="button-secondary"
          onClick={() => setDraft(emptyProfile)}
        >
          Limpiar
        </button>
      </div>
    </form>
  )
}
