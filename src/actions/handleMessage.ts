import { WSIncomingAction } from "../types/Action"
import { NextRouter } from "next/router"
import { classroomStore } from "../stores/classroom"

export const handleMessage = (router: NextRouter) => (
    action: WSIncomingAction
) => {
    const store = classroomStore.getState()

    if (action.type === "createClassroom") {
        console.log(`Created classroom ${action.data.name}`)

        store.set({ currentRoom: action.data, owned: true })

        router.push("/classroom/[code]", `/classroom/${action.data.code}`)
    } else if (action.type === "joinClassroom") {
        if (action.data.hasJoined) {
            const { name, code, memes } = action.data

            console.log(`Joined classroom ${name}`)

            store.set({ currentRoom: { name, code }, owned: false, memes })
            router.push("/classroom/[code]", `/classroom/${code}`)
        } else {
            store.set({ currentRoom: null })
            router.push("/", "/")
        }
    } else if (action.type === "deletedClassroom") {
        if (!store.currentRoom) return

        store.set({ currentRoom: null, owned: false, memes: [] })

        router.push("/", "/")
    } else if (action.type === "uploadMeme") {
        store.set({
            memes: [...store.memes, action.data]
        })
    } else if (action.type === "deleteMeme") {
        store.set({
            memes: store.memes.filter(({ id }) => id !== action.data.id)
        })
    }
}
