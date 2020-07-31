import { useRouter } from "next/router"
import { WsClient } from "../../hooks/useWebsocket"
import { WSOngoingActions } from "../../types/Action"
import { useClassroom } from "../../stores/classroom"
import Home from ".."
import { Box, Grid, Row, Col } from "jsxstyle"
import { MemeElement } from "../../components/Meme"

interface Props {
    ws: WsClient<WSOngoingActions> | null
}

const Classroom = ({ ws }: Props) => {
    const room = useClassroom()

    if (room.currentRoom === null) {
        return <Home ws={ws} />
    }

    return (
        <Row>
            <MemeElement
                username="ImperialMao"
                title="My first test meme"
                url="https://preview.redd.it/9hicy2cnbzd51.jpg?width=640&crop=smart&auto=webp&s=0b056c9a5217a79391976ee5d7c5d0b649e65086"
            />
        </Row>
    )
}

export default Classroom
