const server_ip = "localhost:3997";

export const env = {
    base_api: `http://${server_ip}/api/v1`,
    api_routes: {
        getActivityByMonth: `agenda/searchmonth`,
        getActivitiesByDay: `agenda/searchday`,
        deleteActivity: `agenda/delete`,
        createActivity: `agenda/create`,
        updateActivity: `agenda/update`,
        createUser: `user/create`,
        editUser: `user/edit`,
        login: 'auth/login'
    }
}
