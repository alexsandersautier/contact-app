import { useApi } from "../composables/useApi";

export function useContactService() {

    const api = useApi()

    const getAll = async () => await api.get('contacts')

    const getById = async (id) => await api.get(`contacts/${id}`)

    const create = async (data) => await api.post('contacts', data)

    return {
        getAll,
        getById,
        create
    }
}