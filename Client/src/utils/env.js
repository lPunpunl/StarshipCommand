export const env = {
    base_api: process.env.REACT_APP_API_URL,
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
