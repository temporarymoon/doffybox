import { LoginPage } from "../../components/LoginPage"
import { Box, Col, Row } from "jsxstyle"
import { TextInput } from "../../components/TextInput"
import { useAuth } from "../../stores/user"
import { useRouter } from "next/router"
import { useState } from "preact/hooks"
import { Submit } from "../../components/Submit"

const NewClassroom = () => {
    const auth = useAuth()
    const router = useRouter()
    const [name, setName] = useState(`${auth.user?.username ?? "ERROR"}s room`)

    if (auth.user === null) {
        return router.push("/login")
    }

    if (!auth.user.isTeacher) {
        return router.push("/home")
    }

    const onSubmit = (e: InputEvent) => {
        e.preventDefault()
        e.stopPropagation()
        auth.createClassroom(name)
    }

    return (
        <LoginPage>
            <Col
                component="form"
                height="100%"
                justifyContent="space-between"
                props={{ onSubmit }}
            >
                <Box>
                    <Row justifyContent="center">
                        <h1>Create new classroom</h1>
                    </Row>

                    <TextInput
                        label="Classroom name:"
                        name="classroom"
                        onChange={setName}
                        placeholder=""
                        required={true}
                        type="text"
                        value={name}
                    ></TextInput>
                </Box>
                <Submit />
            </Col>
        </LoginPage>
    )
}

export default NewClassroom
