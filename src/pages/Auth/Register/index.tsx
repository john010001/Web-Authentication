import Buttom from "../../../components/Buttom"
import Input from "../../../components/Input"
import { lock_img, user_img } from "../../../constans"
import { LOGINPAGE } from "../../../router/constans"
import CardForm from "../components/CardForm"
import useRegisterPageHook from "./hook"

const RegisterPage = () => {

  const {
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
      disableButton,
      validatePassword
    }
  } = useRegisterPageHook()

  return (
    <CardForm title={"REGISTRARME"}
      link={LOGINPAGE}
      linkText="Cancelar"
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
        error={validatePassword().message}
      />
       <Input
        icon={lock_img}
        placeholder="Confirmar contraseña"
        type="password"
        value={repeatPassword}
        onChange={handleRepeatPassword}
      />
      <Buttom
        style={{
          margin: "13px auto",
          marginTop: 30,
          marginBottom: 0
        }}
        text={"REGISTRAR"}
        onClick={onSubmit}
        type="submit"
        disabled={disableButton()}
        loading={loading}
      />
    </CardForm>
  )
}

export default RegisterPage
