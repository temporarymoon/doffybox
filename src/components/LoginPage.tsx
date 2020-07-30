import "preact/compat"
import { ComponentChildren } from "preact"
import { Block, Row } from "jsxstyle"
import { useTheme } from "../stores/theme"

interface Props {
    children: ComponentChildren
}

export const LoginPage = ({ children }: Props) => {
    const { currentTheme } = useTheme()

    return (
        <Row
            backgroundImage='url("/schoolBg.jpg")'
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            height="100vh"
            width="100vw"
            alignItems="center"
        >
            <Block
                background={currentTheme.backgroundRaised}
                boxShadow="3px 3px 4px 4px rgba(100, 100, 100, 0.5)"
                minHeight="50vh"
                minWidth="30vw"
                margin="5rem"
                padding="3rem"
                mediaQueries={{
                    sm: "screen and (max-width: 640px)"
                }}
                smMarginLeft="auto"
                smMarginRight="auto"
                smWidth="100%"
            >
                {children}
            </Block>
        </Row>
    )
}
