import Head from "next/head"
import "preact/compat"
import { Col, Block } from "jsxstyle"
import { App } from "../components/App"

export default function Home() {
    return (
        <App>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Col>
                <Block color="red">1</Block>
                <Block>2</Block>
                <Block>3</Block>
            </Col>
            hello world
        </App>
    )
}
