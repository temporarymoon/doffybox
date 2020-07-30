import "../styles/globals.scss"
import "preact/compat"
import { App } from "../components/App"

interface Props<T> {
    Component: (props: T) => JSX.Element
    pageProps: T
}

export default <T,>({ Component, pageProps }: Props<T>) => {
    return <Component {...pageProps} />
}
