import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AppShell } from './components/AppShell'
import { ClubDetailPage } from './pages/ClubDetailPage'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { loadProfile, saveProfile } from './lib/storage'
import type { ReaderProfile } from './types'

function App() {
  const [profile, setProfile] = useState<ReaderProfile | null>(() => loadProfile())

  useEffect(() => {
    saveProfile(profile)
  }, [profile])

  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage profile={profile} />} />
          <Route path="/club/:clubId" element={<ClubDetailPage profile={profile} />} />
          <Route
            path="/perfil"
            element={<ProfilePage profile={profile} onSave={setProfile} />}
          />
        </Routes>
      </AppShell>
    </BrowserRouter>
  )
}

export default App
