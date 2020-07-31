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

type ODeleteMeme = Action<"deleteMeme", { id: number }>

export type WSOngoingActions = OCreateClassroom | OJoinClassroom | ODeleteMeme
export type WSIncomingAction = ICreateClassroom | IJoinClassroom
