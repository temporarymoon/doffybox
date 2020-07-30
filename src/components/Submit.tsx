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
            padding="0.6rem"
            marginTop="1rem"
            outline="none"
            border="none"
        />
    )
}
