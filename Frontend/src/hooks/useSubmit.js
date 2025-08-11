import { useState } from 'react'
import { config } from '../config/header.config'
import { useAPIMsgAndError, useAuthStore } from '../store'
import axios from 'axios'

// do not use the isLoading ,if ur using submitData more than once,make some other loading state in component

const useSubmit = () => {
    const { token } = useAuthStore()
    const { setMsgWithErr, res } = useAPIMsgAndError()
    const [invalidate, setInvalidate] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    async function submitData(url, body, withMutate = false) {
        setIsLoading(true)
        try {
            if (withMutate) return await axios.post(url, body, config(token))
            let res = await axios.post(url, body, config(token))
            setMsgWithErr({ msg: res?.data?.message, err: false })
            return res
        } catch (err) {
            setMsgWithErr({ msg: err?.response?.data, err: true })
            throw err
        } finally {
            setIsLoading(false)
        }
    }
    return { isLoading, submitData, res, invalidate, setInvalidate }
}

export { useSubmit }