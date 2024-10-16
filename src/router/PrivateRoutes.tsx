import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { AUTH_ROUTE } from './constans'

interface Props {
    admin: boolean
}
const PrivateRoutes = ({
    admin
}: Props) => {
    const location = useLocation()

    return admin ? (
        <Outlet />
    ) : <Navigate
        to={AUTH_ROUTE}
        state={{ from: location }}
        replace
    />
}

export default PrivateRoutes
