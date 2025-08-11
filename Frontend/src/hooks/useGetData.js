import { useQuery } from 'react-query'
import { config } from '../config/header.config'
import { useAuthStore } from '../store/index'
import axios from 'axios'

export const useGetData = (key, url, QueryConfig = {}, body = {}) => {
    const { token } = useAuthStore()
    const { data, error, isLoading, isFetched } = useQuery(
        key,
        async () => {
            try {
                return await axios.get(url, config(token))
            } catch (error) {
                throw error;
            }
        },
        {
            ...QueryConfig,
            queryHash: key,
        }
        // QueryConfig
    )
    return { data: data?.data, error, isLoading, isFetched }
}