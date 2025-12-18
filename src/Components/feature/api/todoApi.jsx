import apiClient from "./apiClint.jsx";

//todo crud operation

const todoApi = {
    /**
     * Add todo
     * @param {object} todoData - { todoText: string }
     * @param {string} token - Authorization token
     */
    async addTodo(todoData, token) {
        return apiClient.postWithAuth('/todo/addtodo', todoData, token)
    },

    /**
     * Update/Edit todo
     * @param {object} editTodo - { id: number, todoText: string }
     * @param {string} token - Authorization token
     */
    async updateTodo(editTodo, token) {
        return apiClient.putWithAuth('/todo/edit', editTodo, token)
    },

    /**
     * View all todos
     * @param {string} token - Authorization token
     */
    async viewTodo(token) {
        return apiClient.getWithAuth('/todo/viewtodo', token)
    },

    /**
     * Mark todo as completed
     * @param {object} todoData - { id: number, completed: boolean }
     * @param {string} token - Authorization token
     */
    async completeTodo(todoData, token) {
        return apiClient.putWithAuth('/todo/completed', todoData, token)
    },

    /**
     * Delete todo
     * @param {number} id - Todo ID to delete
     * @param {string} token - Authorization token
     */
    async deleteTodo(id, token) {
        return apiClient.deleteWithAuth(`/todo/delete/${id}`, token)
    },

    /**
     * Get logged in user data
     * @param {number} userId - User ID
     * @param {string} token - Authorization token
     */
    async getUserData(userId, token) {
        return apiClient.getWithAuth(`/register/getuser/${userId}`, token)
    },

    /**
     * Send contact message
     * @param {object} contactData - { userId, name, email, message }
     * @param {string} token - Authorization token
     */
    async sendContactMessage(contactData, token) {
        return apiClient.postWithAuth('/ContactUs/contact', contactData, token)
    }
}

export default todoApi