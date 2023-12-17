import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PrivatePage from './pages/PrivatePage'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import MissingPage from './pages/MissingPage'
import UnauthorizedPage from './pages/UnauthorizedPage'
import ProtectedRoutes from './components/ProtectedRoutes'

const App = () => {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} duration={'3000'}/>
      <Routes>
        <Route element={<ProtectedRoutes allowedRoles={['ROLE_ADMIN']} />}>
          <Route element={<Layout />}>
            <Route path="/private" element={<PrivatePage />} />
            <Route path="/" element={<HomePage />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<MissingPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
