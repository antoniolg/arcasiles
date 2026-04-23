import type { FilterState } from '../types'

interface FilterBarProps {
  filters: FilterState
  cities: string[]
  genres: string[]
  visibleCount: number
  totalCount: number
  onChange: (nextState: FilterState) => void
}

export function FilterBar({
  filters,
  cities,
  genres,
  visibleCount,
  totalCount,
  onChange,
}: FilterBarProps) {
  return (
    <section className="panel" id="directorio">
      <div className="panel-header">
        <div>
          <div className="panel-kicker">Directorio</div>
          <h2 className="panel-title">Encuentra un club que ya se sienta tuyo</h2>
        </div>
        <p className="panel-subtitle">
          Una capa de filtro simple para moverte rapido durante la demo.
        </p>
      </div>

      <div className="filter-bar">
        <div className="filter-field">
          <label htmlFor="modality">Modalidad</label>
          <select
            id="modality"
            value={filters.modality}
            onChange={(event) =>
              onChange({ ...filters, modality: event.target.value as FilterState['modality'] })
            }
          >
            <option value="all">Todas</option>
            <option value="online">Online</option>
            <option value="presencial">Presencial</option>
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="city">Ciudad</label>
          <select
            id="city"
            value={filters.city}
            onChange={(event) => onChange({ ...filters, city: event.target.value })}
          >
            <option value="all">Todas</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="genre">Genero</label>
          <select
            id="genre"
            value={filters.genre}
            onChange={(event) => onChange({ ...filters, genre: event.target.value })}
          >
            <option value="all">Todos</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="filter-reset"
          onClick={() =>
            onChange({
              modality: 'all',
              city: 'all',
              genre: 'all',
            })
          }
        >
          Limpiar filtros
        </button>
      </div>

      <div className="filter-summary">
        <span>
          Mostrando {visibleCount} de {totalCount} clubes
        </span>
        <span>Explora, entra en detalle y ensena la siguiente lectura</span>
      </div>
    </section>
  )
}
