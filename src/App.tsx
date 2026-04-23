import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { ClubDetailPage } from './pages/ClubDetailPage'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { SpainMapPage } from './pages/SpainMapPage'
import { useReaderProfile } from './presentation/hooks/useReaderProfile'

function App() {
  const { profile, saveProfile } = useReaderProfile()

  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage profile={profile} />} />
          <Route path="/mapa" element={<SpainMapPage />} />
          <Route path="/club/:clubId" element={<ClubDetailPage profile={profile} />} />
          <Route
            path="/perfil"
            element={<ProfilePage profile={profile} onSave={saveProfile} />}
          />
        </Routes>
      </AppShell>
    </BrowserRouter>
  )
}

export default App
