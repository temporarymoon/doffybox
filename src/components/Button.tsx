import { Box, CSSProperties } from "jsxstyle"
import { ComponentChildren } from "preact"

export const Button = (
    props: CSSProperties & { children: ComponentChildren }
) => {
    return (
        <Box
            component="button"
            background="black"
            fontSize="2rem"
            outline="none"
            border="none"
            padding="1rem"
            color="white"
            borderRadius="4px"
            {...props}
        ></Box>
    )
}
