import { Meme } from "./Meme"

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
    | { hasJoined: false }
    | { hasJoined: true; code: string; name: string; memes: Meme[] }
>

type DeleteMeme = Action<"deleteMeme", { id: number }>

type IDeletedClassroom = Action<"deletedClassroom", {}>

type OUploadMeme = Action<"uploadMeme", { url: string; title: string }>

type IUploadMeme = Action<"uploadMeme", Meme>

export type WSOngoingActions =
    | OCreateClassroom
    | OJoinClassroom
    | DeleteMeme
    | OUploadMeme
export type WSIncomingAction =
    | ICreateClassroom
    | IJoinClassroom
    | IDeletedClassroom
    | DeleteMeme
    | IUploadMeme
