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
}

export const [useAuth, auth] = create<AuthStore>(set => ({
    register: ({ username, email, password }) => {
        console.log({ username, email, password })
    },
    login: ({ email, password }) => {
        console.log({ email, password })
    },
    load: async () => {
        const res = await fetch(`${baseUrl}/users/`)

        if (res.status === 401) {
            set({ user: null })
            return
        }

        const json = await res.json()

        console.log({ json })

        set({ user: json })

        auth.getState().load()
    },
    user: {
        discriminator: "0000",
        username: "yugiohxlight",
        email: "rafaeladriel11@gmail.com",
        isTeacher: true
    },
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
    }
}))
