import { useRouter } from "next/router"
import { WsClient } from "../../hooks/useWebsocket"
import { WSOngoingActions } from "../../types/Action"
import { useClassroom } from "../../stores/classroom"
import Home from ".."
import { Box, Grid, Row, Col, Block } from "jsxstyle"
import { MemeElement } from "../../components/Meme"
import { bg } from "../../constants"
import { useCallback } from "preact/hooks"

interface Props {
    ws: WsClient<WSOngoingActions> | null
}

const Classroom = ({ ws }: Props) => {
    const room = useClassroom()

    if (room.currentRoom === null) {
        return <Home ws={ws} />
    }

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
                overflowX="hidden"
                overflowY="scroll"
            >
                <MemeElement
                    username="ImperialMao"
                    title="My first test meme"
                    url="https://preview.redd.it/9hicy2cnbzd51.jpg?width=640&crop=smart&auto=webp&s=0b056c9a5217a79391976ee5d7c5d0b649e65086"
                    admin={room.owned}
                    onDelete={deleteMeme(1)}
                    id={1}
                />

                <MemeElement
                    username="VyegWaffle"
                    title="Haha, memes co brrrrrrrrrr"
                    url="https://preview.redd.it/bkb3c1b0xwd51.jpg?width=640&crop=smart&auto=webp&s=13a836ae9a691107d1407e7fa60e3374bfa5c995"
                    admin={room.owned}
                    onDelete={deleteMeme(2)}
                    id={0}
                />
            </Col>
        </Col>
    )
}

export default Classroom
