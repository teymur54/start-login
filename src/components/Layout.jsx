import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <Sidebar />

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
