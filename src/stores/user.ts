import { create } from "zustand"

export interface User {
    username: string
    discriminator: string
    email: string
    isTeacher: boolean
}

export interface AuthStore {
    register(data: {
        username: string
        email: string
        password: string
        isTeacher: boolean
    }): void
    login(data: { email: string; password: string })
    user: null | User
}

export const [useAuth] = create<AuthStore>(set => ({
    register: ({ username, email, password }) => {
        console.log({ username, email, password })
    },
    login: ({ email, password }) => {
        console.log({ email, password })
    },
    user: null
}))
