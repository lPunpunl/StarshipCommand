import { env } from "../utils/constants";
import axios from "axios";

export const login = async (formData) => {

    try {
        const response = await axios.post(`${env.base_api}/${env.api_routes.login}`, 
            formData,
            {headers: {
                'Content-Type':'application/json'
            }});
        
        return{
            succes: true,
            token: response.data.token,
            userData: response.data.existingUser
        };

    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
        throw new Error(errorMessage);
    }
};