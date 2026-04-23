import type { PropsWithChildren } from 'react'
import { NavLink } from 'react-router-dom'

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink to="/" className="brand-lockup" aria-label="Arcasiles">
          <span>arca</span>
          <span>siles</span>
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
        </nav>
      </header>

      <main className="app-main">{children}</main>
    </div>
  )
}
