import { useApi } from "../composables/useApi";

export function useContactService() {

    const api = useApi()

    const getAll = async () => await api.get('api/v1/contacts')

    const getById = async (id) => await api.get(`api/v1/contacts/${id}`)

    const create = async (data) => await api.post('api/v1/contacts', data)

    return {
        getAll,
        getById,
        create
    }
}