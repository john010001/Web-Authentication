import { Navigate, Outlet, useLocation } from 'react-router-dom'
import './styles.css'
import { useAuthStateContextProvider } from '../../context/AuthContext'
const AuthPageContent = () => {
    let location = useLocation()
    let from = location.state?.from?.pathname || '/'
    const {
        isAuthenticated
    } = useAuthStateContextProvider()

    return isAuthenticated ? <Navigate to={from} /> : (
        <div className='auth-container'>
            <Outlet />
        </div>
    )
}

export default AuthPageContent
