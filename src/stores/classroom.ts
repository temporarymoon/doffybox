import { create } from "zustand"

export type Classroom = { code: string; name: string }

export interface ClassroomStore {
    currentRoom: Classroom | null
    setRoom: (v: Classroom) => void
}

export const [useClassroom, classroomStore] = create<ClassroomStore>(set => ({
    currentRoom: null,
    setRoom: r => set({ currentRoom: r })
}))
