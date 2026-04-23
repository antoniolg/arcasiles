import { Link } from 'react-router-dom'
import { ProfileForm } from '../components/ProfileForm'
import type { ReaderProfile } from '../types'

interface ProfilePageProps {
  profile: ReaderProfile | null
  onSave: (profile: ReaderProfile) => void
}

export function ProfilePage({ profile, onSave }: ProfilePageProps) {
  return (
    <section className="profile-layout section-shell">
      <div>
        <div className="page-intro fade-up">
          <div className="section-kicker">Perfil lector</div>
          <h1 className="page-title">Haz que la recomendacion parezca producto real</h1>
          <p className="page-copy">
            Esta pantalla justifica la personalizacion y deja persistencia local para que la experiencia se note viva en toda la app.
          </p>
        </div>

        <ProfileForm profile={profile} onSave={onSave} />
      </div>

      <aside className="workspace-side">
        <section className="panel">
          <div className="section-header">
            <div className="section-kicker">Que se guarda</div>
            <h2 className="section-title">Preferencias que cambian el ranking</h2>
            <p className="section-subtitle">
              No hay IA real ni backend hoy: la gracia esta en que el criterio sea explicable y visible.
            </p>
          </div>

          <div className="profile-aside-list">
            <div className="profile-aside-item">
              Generos favoritos para priorizar afinidad tematica.
            </div>
            <div className="profile-aside-item">
              Modalidad preferida para separar entre online y presencial.
            </div>
            <div className="profile-aside-item">
              Ciudad para impulsar clubes cercanos cuando existen.
            </div>
            <div className="profile-aside-item">
              Ritmo de lectura para afinar sugerencias sin complicar el MVP.
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="section-header">
            <div className="section-kicker">Siguiente paso</div>
            <h2 className="section-title">Vuelve al directorio y mira el cambio</h2>
          </div>

          <Link className="button-primary" to="/">
            Ver sugerencias
          </Link>
        </section>
      </aside>
    </section>
  )
}
