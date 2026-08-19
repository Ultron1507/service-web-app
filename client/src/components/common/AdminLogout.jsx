import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContextValue'
import './AdminLogout.css'

export default function AdminLogout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const signOut = () => {
    logout()
    navigate('/', { replace: true })
  }

  return <button type="button" className="admin-logout" onClick={signOut}><i className="ri-logout-box-r-line" aria-hidden="true" />Logout</button>
}
