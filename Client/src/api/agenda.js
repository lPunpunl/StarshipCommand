import { env } from "../utils/env";
import axios from "axios";


export const getActivitiesByMonth = async (month, year, token, user_id) => {


    try {
        const response = await axios.get(`${env.base_api}/${env.api_routes.getActivityByMonth}`, {
            params: {
                user_id, 
                month,
                year
            },
            headers: {
                'Authorization':`Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401){
            window.location.reload()
        }
        const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
        throw new Error(errorMessage);
    }
};

export const getActivitiesByDay = async ( day, month, year, token, user_id) => {
    try {
        const response = await axios.get(`${env.base_api}/${env.api_routes.getActivitiesByDay}`, {
            params: {
                user_id,
                day,
                month,
                year
            },
            headers: {
                'Authorization':`Bearer ${token}`
            }
        });


        if (response.data.length === 0) {
            return null;
        }

        

        return response.data;
    } catch (error) {
        if (error.response?.status === 401){
            window.location.reload()
        }
        const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
        throw new Error(errorMessage);
    }
};

export const deleteActivity = async (id, token) => {
    try {
        await axios.delete(`${env.base_api}/${env.api_routes.deleteActivity}/${id}`, 
            {headers: {
                'Authorization':`Bearer ${token}`
            }}
        );

        return(true);
    } catch (error) {
        if (error.response?.status === 401){
            window.location.reload()
        }
        const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
        throw new Error(errorMessage);
    }
}

export const updateActivity = async (_id, time, description, token) =>{
    try {
        const response = await axios.patch(`${env.base_api}/${env.api_routes.updateActivity}`,  
            {_id,time,description}, 
            {headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }}
        );
        return(response);
    } catch (error) {
        if (error.response?.status === 401){
            window.location.reload()
        }
        const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
        throw new Error(errorMessage);
    }
}

export const createActivity = async (time, day, month, year, description, token, user_id) =>{
    try {
        const response = await axios.post(`${env.base_api}/${env.api_routes.createActivity}`,
            {user_id, time, day, month, year, description},
            {headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }}
        );

        return(response)
    } catch (error) {
        if (error.response?.status === 401){
            window.location.reload()
        }
        const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
        throw new Error(errorMessage);
    }
}