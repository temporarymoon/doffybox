import "preact/compat"
import { Block, Col } from "jsxstyle"
import { Ref, RefCallback } from "preact"

interface Props {
    name: string
    label: string
    type: string
    placeholder: string
    value: string
    required: boolean
    onChange: (e: string) => void
}

export const TextInput = ({
    name,
    label,
    required,
    type,
    value,
    placeholder,
    onChange
}: Props) => {
    return (
        <Col marginBottom="1rem" marginTop="1rem">
            <Block
                component="label"
                props={{ htmlFor: name }}
                marginBottom="0.5rem"
            >
                {label}
            </Block>
            <Block
                component="input"
                padding="0.4rem"
                props={{
                    name,
                    placeholder,
                    value,
                    onChange: e => onChange(e.target.value),
                    type,
                    required
                }}
            />
        </Col>
    )
}
