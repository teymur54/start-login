import React from 'react'
import { useNavigate,NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Sidebar = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <aside>
      <div onClick={() => navigate('/')}>
        <p>Xüsusi rabitə şöbəsi</p>
      </div>

      <nav>
        <NavLink
          to="/"
        >Home
        </NavLink>
        <NavLink
          to="/private"
        >Private Page
        </NavLink>
        <NavLink
          to="/unauthorized"
        >Unauthorized
        </NavLink>
        <NavLink
          to="*"
        >Missing
        </NavLink>
      </nav>

      <button
        onClick={() => {
          logout()
        }}  
      >
        Logout
      </button>
    </aside>
  )
}

export default Sidebar
