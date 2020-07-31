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
    }

    if (action.type === "joinClassroom") {
        if (action.data.hasJoined) {
            const { name, code } = action.data

            console.log(`Joined classroom ${name}`)

            store.set({ currentRoom: { name, code }, owned: false })
            router.push("/classroom/[code]", `/classroom/${code}`)
        } else {
            store.set({ currentRoom: null })
            router.push("/", "/")
        }
    }

    if (action.type === "deletedClassroom") {
        if (!store.currentRoom) return

        store.set({ currentRoom: null, owned: false })

        router.push("/", "/")
    }
}
