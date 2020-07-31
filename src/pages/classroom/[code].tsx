import { useRouter } from "next/router"
import { WsClient } from "../../hooks/useWebsocket"
import { WSOngoingActions } from "../../types/Action"
import { useClassroom } from "../../stores/classroom"
import Home from ".."

interface Props {
    ws: WsClient<WSOngoingActions> | null
}

const Classroom = ({ ws }: Props) => {
    const room = useClassroom()

    if (room.currentRoom === null) {
        return <Home ws={ws} />
    }

    return room.owned ? "owner" : "not owner"
}

export default Classroom
