import { create } from "zustand"
import { produce } from "immer"

interface Theme {
    backgroundRaised: string
    background: string
    primary: string
    onPrimary: string
}

const lightTheme: Theme = {
    background: "#eeeeee",
    backgroundRaised: "white",
    primary: "#6a9fb5",
    onPrimary: "white"
}

const darkTheme: Theme = {
    backgroundRaised: "#555555",
    background: "black",
    primary: "#6a9fb5",
    onPrimary: "white"
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
