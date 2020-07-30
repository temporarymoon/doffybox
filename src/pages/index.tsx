import "preact/compat"
import { Col, Block, Box, Row, Grid } from "jsxstyle"
import { Button } from "../components/Button"

export default function Home() {
    return (
        <Col
            height="100vh"
            width="100%"
            background="#42BFDF"
            alignItems="center"
            justifyContent="center"
        >
            <Col
                justifyContent="center"
                alignItems="center"
                class="block wrap"
                // These 2 overwrite the theme
                cursor="default !important"
                padding="2rem !important"
            >
                <Block component="h1" fontSize="3rem">
                    Join classroom
                </Block>
                <Col>
                    <Block
                        padding="0.7rem"
                        fontSize="1.5rem"
                        component="input"
                        class="block wrap"
                        width="100%"
                        props={{
                            name: "Room id",
                            placeholder: "000000",
                            type: "number",
                            maxlength: 10
                        }}
                    ></Block>
                    <Box
                        component="button"
                        class="block accent"
                        marginTop="2rem !important"
                        fontSize="2rem"
                        width="100%"
                    >
                        Join
                    </Box>
                </Col>
            </Col>
            <Col class="block">Or make your own</Col>
        </Col>
    )
}
