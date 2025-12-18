import apiClient from "./apiClint.jsx";

// Profile API operations

const profileApi = {
    /**
     * Get user profile data
     * @param {number} userId - User ID
     * @param {string} token - Authorization token
     */
    async getProfile(userId, token) {
        return apiClient.getWithAuth(`/register/getuser/${userId}`, token)
    },

    /**
     * Update user profile
     * @param {number} userId - User ID
     * @param {FormData} formData - Form data with profile fields and image
     * @param {string} token - Authorization token
     */
    async updateProfile(userId, formData, token) {
        return apiClient.putFormData(`/register/editprofile/${userId}`, formData, token)
    }
}

export default profileApi

