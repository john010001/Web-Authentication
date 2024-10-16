import Buttom from "../../../components/Buttom"
import Input from "../../../components/Input"
import { lock_img, user_img } from "../../../constans"
import { REGISTERPAGE } from "../../../router/constans"
import CardForm from "../components/CardForm"
import useLoginPageHook from "./hook"

const LoginPage = () => {
  const {
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
  } = useLoginPageHook()
  
  return (
    <CardForm title={"INICIAR SESIÓN"}
      link={REGISTERPAGE}
      linkText="Registrarme"
    >
      <Input
        icon={user_img}
        placeholder="Usuario"
        value={username}
        onChange={handleUsername}
      />
      <Input
        icon={lock_img}
        placeholder="Contraseña"
        type="password"
        value={password}
        onChange={handlePassword}
      />
      <Buttom
        style={{
          margin: "13px auto",
          marginTop: 30,
          marginBottom: 0
        }}
        disabled={loading}
        text={"INGRESAR"}
        onClick={onSubmit}
        type="submit"
        loading={loading}
      />
    </CardForm>
  )
}

export default LoginPage
