import { create } from "zustand"
import { produce } from "immer"

interface Theme {
    background: string
    primary: string
}

const lightTheme: Theme = {
    background: "white",
    primary: "#6a9fb5"
}

const darkTheme: Theme = {
    background: "dark",
    primary: "#6a9fb5"
}

export type ThemeName = "light" | "dark"

export interface ThemeStore {
    setTheme(name: ThemeName): void
    toggleTheme(): void
    currentTheme: Theme
}

export const [useTheme] = create<ThemeStore>(set => ({
    setTheme: (name: ThemeName) =>
        set({ currentTheme: name === "light" ? lightTheme : lightTheme }),
    toggleTheme: () =>
        set(
            produce((state: ThemeStore) => {
                if (state.currentTheme === lightTheme) {
                    state.currentTheme = darkTheme
                } else {
                    state.currentTheme = lightTheme
                }
            })
        ),
    currentTheme: lightTheme
}))
