import { WSOngoingActions, WSIncomingAction } from "../types/Action"
import { NextRouter } from "next/router"
import { classroomStore } from "../stores/classroom"

export const handleMessage = (router: NextRouter) => (
    action: WSIncomingAction
) => {
    const store = classroomStore.getState()

    if (action.type === "createClassroom") {
        console.log(`Created classroom ${action.data.name}`)

        store.setRoom(action.data)
        store.own()

        router.replace("/classroom/[code]", `/classroom/${action.data.code}`)
    }
}
