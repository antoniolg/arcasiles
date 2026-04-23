import { Link } from 'react-router-dom'
import type { ReaderProfile } from '../types'

interface HeroProps {
  clubsCount: number
  profile: ReaderProfile | null
}

export function Hero({ clubsCount, profile }: HeroProps) {
  return (
    <section className="hero section-shell">
      <div className="hero-copy fade-up">
        <div className="hero-overline">Reto B</div>
        <h1 className="hero-title">
          Clubes de lectura que <span className="hero-title-accent">encajan</span>{' '}
          contigo.
        </h1>
        <p className="hero-description">
          Descubre grupos reales, filtra por modalidad y ciudad, y deja que tu
          perfil lector te ordene primero lo que mas te va a apetecer abrir.
        </p>

        <div className="hero-actions">
          <a className="button-primary" href="#directorio">
            Explorar clubes
          </a>
          <Link className="button-secondary" to="/perfil">
            {profile ? 'Ajustar mi perfil' : 'Crear mi perfil lector'}
          </Link>
        </div>

        <div className="hero-meta">
          <span className="hero-chip">{clubsCount} clubes listos para demo</span>
          <span className="hero-chip">
            {profile ? 'Sugerencias activas' : 'Activa recomendaciones'}
          </span>
          <span className="hero-chip">Online y presenciales</span>
        </div>
      </div>

      <aside className="hero-side fade-up delay-1">
        <div className="hero-side-label">Batalla de IA · 23.04</div>

        <div className="hero-art" aria-hidden="true">
          <div className="hero-art-orb top"></div>
          <div className="hero-art-orb bottom"></div>

          <div className="hero-mascot">
            <div className="hero-mascot-head"></div>
            <div className="hero-mascot-eye left"></div>
            <div className="hero-mascot-eye right"></div>
            <div className="hero-mascot-body"></div>
            <div className="hero-mascot-arm left"></div>
            <div className="hero-mascot-arm right"></div>
            <div className="hero-mascot-hand left"></div>
            <div className="hero-mascot-hand right"></div>
            <div className="hero-mascot-leg left"></div>
            <div className="hero-mascot-leg right"></div>
            <div className="hero-mascot-foot left"></div>
            <div className="hero-mascot-foot right"></div>
          </div>
        </div>

        <div className="hero-side-note">
          <small>MVP en 60 min</small>
          <p>
            Directorio con tarjetas, filtros por modalidad y ciudad, ficha de
            club y perfil que condiciona sugerencias.
          </p>
        </div>
      </aside>
    </section>
  )
}
