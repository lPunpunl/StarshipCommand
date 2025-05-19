import { env } from "../utils/constants";
import axios from "axios";

export const createUser = async (formData) => {

    try {
        const response = await axios.post(`${env.base_api}/${env.api_routes.createUser}`, 
            formData,
            {headers: {
                'Content-Type':'application/json'
            }});
        
        return(response);
    } catch (error) {
        console.log(error);
        console.error("Error:", error.response?.data || error.message);
        alert("failure at creating");
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
        return(response);
    } catch (error) {
        console.log(error);
        console.error("Error:", error.response?.data || error.message);
        alert("failure at updating the user");
    }
}