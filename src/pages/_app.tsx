import "../styles/globals.scss"
import "preact/compat"
import { useWebSocket } from "../hooks/useWebsocket"
import { baseUrl } from "../constants"
import { handleMessage } from "../actions/handleMessage"
import { useRouter } from "next/router"
import { WSOngoingActions, WSIncomingAction } from "../types/Action"

interface Props<T> {
    Component: (props: T) => JSX.Element
    pageProps: T
}

const MyApp = <T,>({ Component, pageProps }: Props<T>) => {
    const router = useRouter()
    const ws = useWebSocket<WSIncomingAction, WSOngoingActions>({
        url: baseUrl,
        onMessage: handleMessage(router)
    })

    return (
        <>
            <link
                rel="stylesheet"
                href="https://unpkg.com/blocks.css/dist/blocks.min.css"
            />
            <Component {...pageProps} ws={ws} />
        </>
    )
}

export default MyApp
