import "preact/compat"
import { Col, Block, Box, Row, Grid } from "jsxstyle"
import { useState, useCallback } from "preact/hooks"
import { WsClient } from "../hooks/useWebsocket"
import { WSOngoingActions } from "../types/Action"
import Link from "next/link"

const mediaQueries = {
    lg: "screen and (max-width: 1120px)",
    sm: "screen and (max-width: 545px)"
}

interface Props {
    ws: WsClient<WSOngoingActions> | null
}

export default function Home({ ws }: Props) {
    const [code, setCode] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")

    const createClassroom = useCallback(() => {
        if (!ws) return

        ws.send({
            type: "createClassroom",
            data: { name }
        })
    }, [name, ws])

    const joinClassroom = useCallback(() => {
        if (!ws) return

        ws.send({
            type: "joinClassroom",
            data: { code, username }
        })
    }, [code, username, ws])

    return (
        <Row
            mediaQueries={mediaQueries}
            lgFlexDirection="column"
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
                <Block
                    component="h1"
                    fontSize="3rem"
                    mediaQueries={mediaQueries}
                    textAlign="center"
                    smFontSize="2rem"
                >
                    Join classroom
                </Block>
                <Col>
                    <Block
                        padding="0.7rem"
                        fontSize="1.5rem"
                        component="input"
                        textAlign="center"
                        class="block wrap"
                        width="100%"
                        props={{
                            name: "Username",
                            placeholder: "Jhon Titor",
                            type: "text",
                            maxlength: 20,
                            onChange: e => setUsername(e.target.value),
                            value: username,
                            autosuggest: "off"
                        }}
                    ></Block>
                    <Block
                        padding="0.7rem"
                        fontSize="1.5rem"
                        component="input"
                        textAlign="center"
                        class="block wrap"
                        width="100%"
                        props={{
                            name: "Room id",
                            placeholder: "000000",
                            type: "number",
                            maxlength: 10,
                            onChange: e => setCode(e.target.value),
                            value: code
                        }}
                    ></Block>
                    <Link href="/classroom/[code]" as={`/classroom/${code}`}>
                        <Box
                            component="a"
                            class="block accent"
                            marginTop="2rem !important"
                            fontSize="2rem"
                            width="100%"
                            textAlign="center"
                            props={{ onClick: joinClassroom }}
                        >
                            Join
                        </Box>
                    </Link>
                </Col>
            </Col>

            <Block class="block" margin="2rem !important">
                or
            </Block>
            <Col
                justifyContent="center"
                alignItems="center"
                class="block wrap accent"
                // These 2 overwrite the theme
                cursor="default !important"
                padding="2rem !important"
            >
                <Block
                    component="h1"
                    fontSize="3rem"
                    mediaQueries={mediaQueries}
                    textAlign="center"
                    smFontSize="2rem"
                >
                    Create your own
                </Block>
                <Col>
                    <Block
                        padding="0.7rem"
                        fontSize="1.5rem"
                        component="input"
                        textAlign="center"
                        class="block wrap"
                        width="100%"
                        props={{
                            name: "Room name",
                            placeholder: "My awesome classroom",
                            type: "text",
                            maxlength: 30,
                            onChange: e => setName(e.target.value),
                            value: name,
                            autocomplete: "off"
                        }}
                    ></Block>
                    <Link href="/classroom/[code]" as="/">
                        <Box
                            component="a"
                            class="block"
                            marginTop="2rem !important"
                            fontSize="2rem"
                            width="100%"
                            textAlign="center"
                            props={{ onClick: createClassroom }}
                        >
                            Create
                        </Box>
                    </Link>
                </Col>
            </Col>
        </Row>
    )
}
