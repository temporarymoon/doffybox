import { create, SetState } from "zustand"

export type Classroom = { code: string; name: string }

export interface ClassroomStore {
    currentRoom: Classroom | null
    owned: boolean
    set: SetState<ClassroomStore>
}

export const [useClassroom, classroomStore] = create<ClassroomStore>(set => ({
    currentRoom: null,
    owned: false,
    set
}))
