import "../styles/globals.scss"
import "preact/compat"

interface Props<T> {
    Component: (props: T) => JSX.Element
    pageProps: T
}

const MyApp = <T,>({ Component, pageProps }: Props<T>) => {
    return <Component {...pageProps} />
}

export default MyApp
