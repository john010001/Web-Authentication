import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/Home'

import Links, { ILink } from './Links'
import PrivateRoutes from './PrivateRoutes'
import { AUTH_ROUTE, LOGINPAGE, REGISTERPAGE } from './constans'
import AuthPageContent from '../pages/Auth'
import LoginPage from '../pages/Auth/Login'
import RegisterPage from '../pages/Auth/Register'
import { useAuthStateContextProvider } from '../context/AuthContext'

const AppRouter = () => {
  const {
    isAuthenticated
  } = useAuthStateContextProvider()

  const renderRoutes = (item: ILink, index: number) => {
    if (item.subMenu) {
      if (item.path === "") {
      } else {
        return (
          <Route key={index} path={item.path} element={<item.element />}>
            <Route index element={<item.subElement />} />
            {
              item.subMenu.map((subItem, subIndex) => {
                if (subItem.path !== "") {
                  return <Route path={subItem.path} key={subIndex} element={<subItem.element />} />
                }
              })
            }
          </Route>
        )
      }
    } else {
      return (
        <Route key={index} path={item.path} element={<item.element />} />
      )
    }
  }

  return (
    <Routes>
      <Route path="/" element={<PrivateRoutes admin={isAuthenticated} />}>
        <Route index element={<HomePage/>} />
        {
          Links.map((link, index) => renderRoutes(link, index))
        }
      </Route>
      <Route path={AUTH_ROUTE} element={<AuthPageContent/>}>
        <Route index element={<LoginPage />} />
        <Route path={LOGINPAGE} element={<LoginPage />} />
        <Route path={REGISTERPAGE} element={<RegisterPage />} />
      </Route>
    </Routes >
  )
}

export default AppRouter