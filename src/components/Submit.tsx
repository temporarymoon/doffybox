import { Block } from "jsxstyle"
import { useTheme } from "../stores/theme"

export const Submit = () => {
    const { currentTheme } = useTheme()

    return (
        <Block
            component="input"
            cursor="pointer"
            props={{ type: "submit" }}
            background={currentTheme.primary}
            color={currentTheme.onPrimary}
            padding="0.5rem"
            outline="none"
            border="none"
            boxShadow="3px 3px 2px 2px rgba(50,50,50,0.3)"
        />
    )
}
