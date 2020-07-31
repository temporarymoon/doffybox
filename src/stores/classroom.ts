import { create, SetState } from "zustand"
import { Meme } from "../types/Meme"

export type Classroom = { code: string; name: string }

export interface ClassroomStore {
    currentRoom: Classroom | null
    owned: boolean
    username: string
    set: SetState<ClassroomStore>
    memes: Meme[]
}

export const [useClassroom, classroomStore] = create<ClassroomStore>(set => ({
    currentRoom: null,
    owned: false,
    username: "",
    set,
    memes: []
}))
