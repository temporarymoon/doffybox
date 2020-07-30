import "preact/compat"
import { Header } from "./Header"
import { Box, Col } from "jsxstyle"
import { useTheme } from "../stores/theme"
import { ComponentChildren } from "preact"

const headerHeight = 50

interface Props {
    children: ComponentChildren
}

export const App = ({ children }: Props) => {
    const { currentTheme } = useTheme()

    return (
        <Col
            alignItems="center"
            height="100vh"
            background={currentTheme.background}
        >
            <Header height={headerHeight} />
            <Box
                component="main"
                height="100%"
                maxWidth="700px"
                minWidth="50vw"
                padding="1rem"
                background={currentTheme.backgroundRaised}
            >
                {children}
            </Box>
        </Col>
    )
}
