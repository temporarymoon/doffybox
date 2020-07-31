import { WsClient } from "../hooks/useWebsocket"
import { WSOngoingActions } from "../types/Action"
import { useClassroom } from "../stores/classroom"
import Home from "."
import { Row, Col, Block, Box, Inline } from "jsxstyle"
import { MemeElement } from "../components/Meme"
import { bg } from "../constants"
import { useCallback, useState } from "preact/hooks"
import { useDropzone } from "react-dropzone"
import "preact/compat"
import { Metadata } from "../components/Metadata"
import useClipboard from "react-use-clipboard"
import { MdContentCopy, MdDone } from "react-icons/md"
import Switch from "react-switch"

interface Props {
    ws: WsClient<WSOngoingActions> | null
}

const InviteOthers = ({ code }: { code: string }) => {
    const [isCopied, copy] = useClipboard(code)

    return (
        <Col alignItems="center" className="block">
            <Block>
                Invite your students to join this classroom by using the code:
            </Block>
            <Block
                component="strong"
                marginTop="1rem"
                fontSize="2rem"
                textAlign="center"
                props={{ onClick: copy }}
            >
                <Row
                    background="rgb(230,230,230)"
                    borderRadius={4}
                    padding="0.5rem"
                    justifyContent="center"
                    alignItems="center"
                >
                    {isCopied ? <MdDone /> : <MdContentCopy />}

                    <span>{code}</span>
                </Row>
            </Block>
        </Col>
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
        <Col padding="3rem !important" className="block wrapper">
            <Block component="h1">Create meme</Block>
            <Block width="100%" marginTop="2rem" marginBottom="4rem">
                <Block
                    width="100%"
                    component="input"
                    padding="0.7rem"
                    fontSize="1.5rem"
                    textAlign="center"
                    className="block wrap"
                    props={{
                        name: "Meme title",
                        placeholder: "An interesting title",
                        type: "text",
                        maxLength: 20,
                        onChange: e => setTitle(e.target.value),
                        value: title
                    }}
                ></Block>
            </Block>
            <Row
                width="100%"
                className="block accent"
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

const AdminSettings = (props: Props) => {
    const room = useClassroom()

    const setLocked = (isLocked: boolean) => {
        if (!props.ws) return

        props.ws.send({
            type: "setLocked",
            data: {
                isLocked
            }
        })

        room.set({ locked: isLocked })
    }

    return (
        <Col padding="3rem !important" className="block wrapper">
            <Block component="h1">Teacher options</Block>
            <Block width="100%" marginTop="2rem" marginBottom="4rem">
                <Row
                    class="block"
                    display="flex !important"
                    width="100%"
                    alignItems="center"
                    justifyContent="space-evenly"
                >
                    <Inline>Locked:</Inline>

                    <Box
                        component={Switch}
                        props={{
                            checked: room.locked,
                            onChange: setLocked
                        }}
                    />
                </Row>
            </Block>
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
        <>
            <Metadata
                title="Classroom"
                description="Join classrooms to be able to share your memes with the world!"
            />
            <Col alignItems="center" background={bg}>
                <Col
                    maxWidth="800px"
                    height="100vh"
                    overflowY="scroll"
                    overflowX="hidden"
                    justifyContent={empty ? "center" : undefined}
                >
                    {room.owned && <AdminSettings ws={ws} />}
                    {empty && <InviteOthers code={room.currentRoom.code} />}
                    {!room.owned && !room.locked && <UploadMeme ws={ws} />}
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
        </>
    )
}

export default Classroom
