import { Link } from 'react-router-dom'
import type { ReaderProfile } from '../domain/profiles/entities/ReaderProfile'

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
          <img
            className="hero-mascot-image"
            src="/mascots/artichoke-jump.png"
            alt=""
          />

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
