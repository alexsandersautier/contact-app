import { useApi } from "../composables/useApi";

export function useAuthService() {

    const api = useApi()

    const login = async (username, password) => {
        const response = await api.post('users/login', {username, password})
        if (response.status >= 200 && response.status < 300) {
            const token = btoa(`${username}:${password}`)
            localStorage.setItem('token', `Basic ${token}`)
            return true
        }
        return false
    }

    const createUser = async (username, password) => {
        const response = await api.post('users', {username, password})
        if (response.status >= 200 && response.status < 300) {
            const token = btoa(`${username}:${password}`)
            localStorage.setItem('token', `Basic ${token}`)
            return true
        }
        return false
    }


    return {
        login,
        createUser
    }
}