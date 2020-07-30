import { create } from "zustand"
import { baseUrl, defaultPfp } from "../constants"
import { url } from "gravatar"

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
    load(): Promise<void>
    login(data: { email: string; password: string })
    createClassroom(name: string): Promise<void>
    profilePicture(): string
    user: null | User
    classroom: {
        id: string
        name: string
        owned: boolean
    } | null
}

export const [useAuth, auth] = create<AuthStore>(set => ({
    register: ({ username, email, password }) => {
        console.log({ username, email, password })
    },
    login: ({ email, password }) => {
        console.log({ email, password })
    },
    load: async () => {
        try {
            const res = await fetch(`${baseUrl}/users/`)

            const json = await res.json()

            if (res.status > 299) {
                throw new Error("this should be catched")
            }

            set({ user: json })
        } catch {
            set({ user: null })
        }
    },
    user: null,
    profilePicture: () => {
        const user = auth.getState().user

        if (user === null) return defaultPfp

        const pfp = url(user.email, {
            rating: "pg"
        })

        return pfp
    },
    createClassroom: async (name: string) => {
        console.log(`Created ${name}`)
        set({
            classroom: {
                id: "myid",
                name,
                owned: true
            }
        })
    },
    classroom: null
}))
