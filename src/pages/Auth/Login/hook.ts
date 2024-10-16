// logic to login username and password

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginService } from "../../../services/authServices"
import { useAuthStateContextProvider } from "../../../context/AuthContext"

const useLoginPageHook = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const{
     setIsAuthenticated
    } = useAuthStateContextProvider()

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const onSubmit = () => {
        setLoading(true)
        
        loginService(username, password)
            .then((response) => {
                console.log(response.data)
                //TODO: RELLENAR EL TOKEN.
                localStorage.setItem('token', response.data.jwToken)
                setIsAuthenticated(true)
                setLoading(false)
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }

    return {
        models: {
            username,
            password,
            loading
        },
        operations: {
            handleUsername,
            handlePassword,
            onSubmit
        }
    }
}

export default useLoginPageHook