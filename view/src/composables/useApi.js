import axios from "axios"

export function useApi() {
    const apiURL = import.meta.env.VITE_URL_API

    const apiClient = axios.create({
        baseURL: apiURL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })

    return apiClient
}