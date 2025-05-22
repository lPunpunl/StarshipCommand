import { env } from "../utils/constants";
import axios from "axios";

export const createUser = async (formData) => {

    try {
        const response = await axios.post(`${env.base_api}/${env.api_routes.createUser}`, 
            formData,
            {headers: {
                'Content-Type':'application/json'
            }});
        
        return(response.data.message);
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
        throw new Error(errorMessage);
    }
};

export const editUser = async (updateInfo, token) =>{

    try {
        const response = await axios.patch(`${env.base_api}/${env.api_routes.editUser}`,  
            {
                user: updateInfo.user, 
                password: updateInfo.password, 
                newUser: updateInfo.newUser, 
                newPassword: updateInfo.newPassword
            }, 
            {headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }}
        );
        return(response.data.message);
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
        throw new Error(errorMessage);
    }
}