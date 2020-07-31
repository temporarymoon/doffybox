import { WsClient } from "../../hooks/useWebsocket"
import { WSOngoingActions } from "../../types/Action"
import { useClassroom } from "../../stores/classroom"
import Home from ".."
import { Box, Grid, Row, Col, Block } from "jsxstyle"
import { MemeElement } from "../../components/Meme"
import { bg } from "../../constants"
import { useCallback, useState } from "preact/hooks"
import { useDropzone } from "react-dropzone"
import "preact/compat"
import { WSAEACCES } from "constants"

interface Props {
    ws: WsClient<WSOngoingActions> | null
}

const InviteOthers = ({ code }: { code: string }) => {
    return (
        <Block class="block">
            Invite your students to join this classroom by using the code:
            <Block
                component="strong"
                marginTop="1rem"
                fontSize="2rem"
                textAlign="center"
            >
                {
                    <Box
                        component="span"
                        background="rgb(230,230,230)"
                        borderRadius={4}
                        padding="0.2rem"
                    >
                        {code}
                    </Box>
                }
            </Block>
        </Block>
    )
}

const UploadMeme = (props: Props) => {
    const onDrop = (files: FileList) => {
        if (files.length === 0) return

        const first = files[0]

        if (!first) return

        const reader = new FileReader()

        setLoading(true)

        reader.onloadend = function () {
            setLoading(false)
            const url = reader.result

            if (!props.ws || url === null) return
            props.ws.send({
                type: "uploadMeme",
                data: {
                    url: typeof url === "string" ? url : url.toString(),
                    title
                }
            })
        }

        reader.readAsDataURL(first)
    }

    const { getInputProps, getRootProps, isDragActive } = useDropzone({
        onDrop
    } as any)

    const [title, setTitle] = useState("A cultured title")
    const [loading, setLoading] = useState(false)

    const message = isDragActive
        ? "Drop your image here to submit..."
        : "Drag your image here, or click to select files"

    return loading ? (
        <p className="block accent">Loading...</p>
    ) : (
        <Col padding="3rem !important" class="block wrapper">
            <Block component="h1">Create meme</Block>
            <Block width="100%" marginTop="2rem" marginBottom="4rem">
                <Block
                    width="100%"
                    component="input"
                    padding="0.7rem"
                    fontSize="1.5rem"
                    textAlign="center"
                    class="block wrap"
                    props={{
                        name: "Meme title",
                        placeholder: "An interesting title",
                        type: "text",
                        maxlength: 20,
                        onChange: e => setTitle(e.target.value),
                        value: title
                    }}
                ></Block>
            </Block>
            <Row
                width="100%"
                class="block accent"
                padding="2rem"
                height="4rem"
                props={{ ...getRootProps() }}
                justifyContent="center"
                alignItems="center"
                display="flex !important"
            >
                <input {...(getInputProps() as any)} />
                {message}
            </Row>
        </Col>
    )
}

const Classroom = ({ ws }: Props) => {
    const room = useClassroom()

    if (room.currentRoom === null) {
        return <Home ws={ws} />
    }

    const empty = room.owned && room.memes.length === 0

    const deleteMeme = useCallback(
        (id: number) => () => {
            if (!ws) return
            ws.send({
                type: "deleteMeme",
                data: { id }
            })
        },
        [ws, room]
    )

    return (
        <Col alignItems="center" background={bg}>
            <Col
                maxWidth="800px"
                height="100vh"
                overflowY="scroll"
                overflowX="hidden"
                justifyContent={empty ? "center" : undefined}
            >
                {empty && <InviteOthers code={room.currentRoom.code} />}
                {!room.owned && <UploadMeme ws={ws} />}
                {[...room.memes].reverse().map(meme => (
                    <MemeElement
                        {...meme}
                        onDelete={deleteMeme(meme.id)}
                        key={meme.id}
                        admin={room.owned}
                    />
                ))}
            </Col>
        </Col>
    )
}

export default Classroom
