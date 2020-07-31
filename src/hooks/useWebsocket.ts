import { useState, useEffect } from "preact/hooks"

interface Props<T> {
    url: string
    onMessage: (data: T) => void
}

export interface WsClient<T> {
    ws: WebSocket
    send: (v: T) => void
}

/**
 * Create a websocket which gets destroyed with the component
 *
 * @param url The url to the websocket server.
 */
export const useWebSocket = <T, U>({
    url,
    onMessage
}: Props<T>): WsClient<U> | null => {
    const [ws, setWs] = useState<null | WebSocket>(null)

    useEffect(() => {
        if (typeof window === "undefined") {
            return
        }

        const socket = new WebSocket(url)

        setWs(socket)

        socket.addEventListener("message", (m: MessageEvent) => {
            onMessage(JSON.parse(m.data))
        })

        return () => {
            socket.close()
        }
    }, [])

    return ws && { ws, send: m => ws && ws.send(JSON.stringify(m)) }
}
