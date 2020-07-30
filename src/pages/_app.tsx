import "../styles/globals.scss"
import "preact/compat"

interface Props<T> {
    Component: (props: T) => JSX.Element
    pageProps: T
}

const MyApp = <T,>({ Component, pageProps }: Props<T>) => {
    return (
        <>
            <link
                rel="stylesheet"
                href="https://unpkg.com/blocks.css/dist/blocks.min.css"
            />
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
