// registro de username, password y repeat password
// Reglas para la contraseña:


import { useState } from "react"
import { registerService } from "../../../services/authServices"
import { useNavigate } from "react-router-dom"


const useRegisterPageHook = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleRepeatPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.target.value)
    }

    const onSubmit = () => {
        setLoading(true)
        registerService(username, password)
            .then((response) => {
                setLoading(false)
                navigate('/auth/login')
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }

    const validatePassword = () => {
        // - Mínimo 8 caracteres
        // - Una mayúscula
        // - Una minúscula
        // - Un número
        if (password.length === 0) {
            return {
                valid: false,
                message: ""
            }
        }

        if (password.length < 8) {
            // return "La contraseña debe tener al menos 8 caracteres"
            return {
                valid: false,
                message: "La contraseña debe tener al menos 8 caracteres"
            }
        }

        if (!/[A-Z]/.test(password)) {
            // return "La contraseña debe tener al menos una mayúscula"
            return {
                valid: false,
                message: "La contraseña debe tener al menos una mayúscula"
            }
        }

        if (!/[a-z]/.test(password)) {
            // return "La contraseña debe tener al menos una minúscula"
            return {
                valid: false,
                message: "La contraseña debe tener al menos una minúscula"
            }
        }

        if (!/[0-9]/.test(password)) {
            // return "La contraseña debe tener al menos un número"
            return {
                valid: false,
                message: "La contraseña debe tener al menos un número"
            }
        }

        if (password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)) {
            // return ""
            return {
                valid: true,
                message: ""
            }
        }

        return {
            valid: false,
            message: ""
        }

    }

    const disableButton = () => {
        return !username || !password || !repeatPassword || loading || !validatePassword().valid
    }


    return {
        models: {
            username,
            password,
            repeatPassword,
            loading,
        },
        operations: {
            handleUsername,
            handlePassword,
            handleRepeatPassword,
            onSubmit,
            validatePassword,
            disableButton
        }
    }
}


export default useRegisterPageHook