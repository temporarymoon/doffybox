import "preact/compat"
import { Row, Box } from "jsxstyle"
import { useTheme } from "../stores/theme"

// TODO: use an actual logo
const logoUrl =
    "https://pbs.twimg.com/profile_images/890592139792457728/P7i15LLo.jpg"

interface Props {
    height: number
}

export const Header = ({ height }: Props) => {
    const theme = useTheme(t => t.currentTheme)

    return (
        <Row
            component="header"
            height={height}
            zIndex={10}
            background={theme.backgroundRaised}
            width="100vw"
            boxShadow="0 2px 4px 4px rgba(0, 0, 0, 0.4)"
            padding="0.5rem"
        >
            <Box
                component="img"
                props={{ src: logoUrl }}
                height="100%"
                borderRadius="50%"
            />
        </Row>
    )
}
