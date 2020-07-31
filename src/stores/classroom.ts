import { create } from "zustand"

export type Classroom = { code: string; name: string }

export interface ClassroomStore {
    currentRoom: Classroom | null
    owned: boolean
    setRoom(v: Classroom): void
    own(): void
}

export const [useClassroom, classroomStore] = create<ClassroomStore>(set => ({
    currentRoom: null,
    owned: false,
    setRoom: r => set({ currentRoom: r }),
    own() {
        set({ owned: true })
    }
}))
