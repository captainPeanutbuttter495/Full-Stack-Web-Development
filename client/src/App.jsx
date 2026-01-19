import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import MainPage from './components/MainPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
