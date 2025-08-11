import { create } from 'zustand'
import { config } from '../config/header.config'
import DB from '../helper/storage'
import { API } from '../config/url.config'
import axios from '../utils/axios'


const useStore = create((set) => ({
    passToken: null,
    loading: false,
    error: null,
    save: (token) => {
        set({ passToken: token })
    },
}))


const useAccountStore = create((set) => ({
    accountName: null,
    profileImage: null,
    userType: null,
    setAccountName: (name) => {
        set({ accountName: name })
    },
    setProfileImage: (link) => {
        set({ profileImage: link })
    },
    setUserType: (userType) => {
        set({ userType: userType })
    }
}))


const useAuthStore = create((set) => ({
    user: {},
    isAuthenticated: false,
    loading: false,
    token: DB.getToken(),
    error: null,
    setLoginToken: async (res, isEnabled) => {
        set({ loading: true })
        set({ isAuthenticated: true })
        set({ user: res?.data?.User ?? null })
        set({ token: res?.accessToken })
        set({ error: null })
        DB.setToken(res?.accessToken)
        return res?.userType.toLowerCase()
    },
    logout: () => {
        DB.removeToken()
        set({ isAuthenticated: false, user: null })
        set({ token: null })
    },
}))

const useAPIMsgAndError = create((set) => ({
    res: null,
    setMsgWithErr: (res) => {
        set({ res })
    },
    clear: () => {
        set({ res: null })
    },
}))

export { useStore, useAuthStore, useAPIMsgAndError, useAccountStore }