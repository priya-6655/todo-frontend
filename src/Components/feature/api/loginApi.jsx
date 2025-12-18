import apiClient from "./apiClint.jsx";


//todo login register

const loginApi = {
    /**
    * Register user
    * @param {Object} userData
    */

    async todoRegister(userData) {
        return apiClient.post('/register/regUser', userData)
    },

    /**
    * Login user
    * @param {Object} credentials
    */

    async todoLogin(credentials) {
        return apiClient.post('/register/login', credentials)
    }
}

export default loginApi