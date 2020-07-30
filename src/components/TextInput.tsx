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
        <Col margin="1rem">
            <label htmlFor={name}> {label}</label>
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
