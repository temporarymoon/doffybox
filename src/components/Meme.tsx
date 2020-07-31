import { Meme } from "../types/Meme"
import { Block, Col, Row } from "jsxstyle"

type Props = Meme & {
    username: string
}

export const MemeElement = ({ title, url, username }: Props) => {
    return (
        <Col class="block" padding="1rem !important">
            <Row justifyContent="space-between" alignItems="center">
                <Block component="h1" fontSize="2rem">
                    {title}
                </Block>
                <Block>
                    by <strong>{username}</strong>{" "}
                </Block>
            </Row>
            <Block class="block wrapper">
                <Block component="img" width="100%" props={{ src: url }} />
            </Block>
        </Col>
    )
}
