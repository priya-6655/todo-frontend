import apiClient from "./apiClint.jsx";


//vegetable order user login register

const vegLoginApi = {
    /**
    * Register user
    * @param {Object} userData
    */

    async vegRegister(userData) {
        return apiClient.post('/orderVeg/vegorderReg', userData)
    },

    /**
    * Login user
    * @param {Object} credentials
    */

    async vegLogin(credentials) {
        return apiClient.post('/orderVeg/vegorderLogin', credentials)
    }
}

export default vegLoginApi