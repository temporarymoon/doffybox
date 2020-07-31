type Action<T extends string, A> = {
    type: T
    data: A
}

type OCreateClassroom = Action<"createClassroom", { name: string }>
type ICreateClassroom = Action<
    "createClassroom",
    { code: string; name: string }
>

export type WSOngoingActions = OCreateClassroom
export type WSIncomingAction = ICreateClassroom
