import { useQueryClient } from "react-query"
import { useAuthStore } from "../store"

const { API } = require("../config/url.config")
const { useQueryConfig } = require("../config/useQuery.config")
const { useGetData } = require("./useGetData")

const useCached = (key) => {
    const { token } = useAuthStore()
    const { data: cached, isLoading: isCacheLoading } = useGetData(
        key,
        `${process.env.NEXT_PUBLIC_URL}/web/api/auth/v1/IsAuthenticated?token=${token}`,
        useQueryConfig
    )
    return { cached, isCacheLoading }
}

export { useCached }