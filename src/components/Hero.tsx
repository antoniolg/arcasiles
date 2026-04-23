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
        <div className="hero-letter">B</div>
        <h1 className="hero-title">Clubes de lectura</h1>
        <p className="hero-description">
          Una app que <span className="hero-title-accent">conecta personas</span> con
          clubes de lectura reales, tanto online como presenciales en su ciudad.
        </p>

        <div className="hero-actions">
          <a className="button-primary" href="#directorio">
            Explorar clubes
          </a>
          <Link className="button-secondary" to="/perfil">
            {profile ? 'Ajustar mi perfil' : 'Crear mi perfil lector'}
          </Link>
        </div>
      </div>

      <aside className="hero-side fade-up delay-1">
        <div className="hero-side-label">Batalla de IA · 23.04</div>

        <div className="hero-art" aria-hidden="true">
          <div className="hero-b-shape">B</div>
          <div className="hero-mascot hero-mascot-jump">
            <div className="hero-book"></div>
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

          <div className="hero-floating-note">
            <strong>Lee mas.</strong>
            <span>Conecta mas.</span>
            <em>Pertenece.</em>
          </div>
        </div>

        <div className="hero-side-note">
          <small>{clubsCount} clubes para descubrir</small>
          <p>
            {profile
              ? 'Tu perfil ya esta activando sugerencias personalizadas en toda la experiencia.'
              : 'Crea tu perfil lector y cambia el orden del directorio con recomendaciones visibles.'}
          </p>
        </div>
      </aside>
    </section>
  )
}
