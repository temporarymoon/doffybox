import { Meme } from "../types/Meme"
import { Block, Col, Row } from "jsxstyle"
import { MdDelete } from "react-icons/md"

type Props = Meme & {
    username: string
    admin: boolean
    onDelete(): void
}

export const MemeElement = ({
    title,
    url,
    username,
    admin,
    onDelete
}: Props) => {
    return (
        <Col class="block" padding="1rem !important">
            <Row alignItems="start">
                <Row
                    alignItems="center"
                    class="block wrap"
                    display="flex !important"
                    justify-content="space-evenly"
                    width="100%"
                >
                    <Block component="h1" fontSize="2rem">
                        {title}
                    </Block>
                    <Block>
                        by <strong>{username}</strong>{" "}
                    </Block>
                </Row>
                {admin && (
                    <Block class="block" props={{ onClick: onDelete }}>
                        <MdDelete />
                    </Block>
                )}
            </Row>
            <Block class="block wrapper">
                <Block component="img" width="100%" props={{ src: url }} />
            </Block>
        </Col>
    )
}
