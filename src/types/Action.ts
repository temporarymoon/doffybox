type Action<T extends string, A> = {
    type: T
    data: A
}

type OCreateClassroom = Action<"createClassroom", { name: string }>
type ICreateClassroom = Action<
    "createClassroom",
    { code: string; name: string }
>

type OJoinClassroom = Action<
    "joinClassroom",
    { code: string; username: string }
>
type IJoinClassroom = Action<
    "joinClassroom",
    { hasJoined: false } | { hasJoined: true; code: string; name: string }
>

export type WSOngoingActions = OCreateClassroom | OJoinClassroom
export type WSIncomingAction = ICreateClassroom | IJoinClassroom
