import { WSOngoingActions, WSIncomingAction } from "../types/Action"
import { NextRouter } from "next/router"
import { classroomStore } from "../stores/classroom"

export const handleMessage = (router: NextRouter) => (
    action: WSIncomingAction
) => {
    if (action.type === "createClassroom") {
        console.log(`Created classroom ${action.data.name}`)
        classroomStore.getState().setRoom(action.data)
        router.replace("/classroom/[code]", `/classroom/${action.data.code}`)
    }
}
