import type { PropsWithChildren } from 'react'
import { NavLink } from 'react-router-dom'

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink to="/" className="brand-lockup" aria-label="Arcasiles">
          aRCA<span>SILES</span>
        </NavLink>

        <nav className="topbar-nav" aria-label="Principal">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'topbar-link active' : 'topbar-link'
            }
          >
            Descubrir
          </NavLink>
          <NavLink
            to="/perfil"
            className={({ isActive }) =>
              isActive ? 'topbar-link active' : 'topbar-link'
            }
          >
            Mi perfil
          </NavLink>
          <NavLink
            to="/mapa"
            className={({ isActive }) =>
              isActive ? 'topbar-link active' : 'topbar-link'
            }
          >
            Mapa
          </NavLink>
          <a className="topbar-link" href="#como-funciona">
            Como funciona
          </a>
          <a className="topbar-link" href="#sobre-nosotros">
            Sobre nosotros
          </a>
          <a className="topbar-link" href="#blog">
            Blog
          </a>
        </nav>

        <div className="topbar-meta">
          <span className="topbar-city">Madrid</span>
          <span className="topbar-avatar">A</span>
        </div>
      </header>

      <main className="app-main">{children}</main>
    </div>
  )
}
