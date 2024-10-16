import { connection } from "../config/connection";
import { DELETE_PATH, LOGIN_PATH, OBTENER_PATH, REGISTER_PATH } from "../constans/apiPaths";

const API = connection();

export const loginService = async (Correo: string, password: string) => {
    try {
        const response = await API.post(LOGIN_PATH, { Correo, password });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const registerService = async (Correo: string, password: string) => {
    try {
        const response = await API.post(REGISTER_PATH, { Correo, password });
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const deleteUserService = async (correo: string) => {
    try {
        const response = await API.post(DELETE_PATH,{correo});
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const obtenerUsuariosService = async () => {
    const response = await API.get(OBTENER_PATH); 
    console.log('Respuesta de la API:', response.data);
    return response.data; 
  };

  
