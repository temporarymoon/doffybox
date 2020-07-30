import "preact/compat"
import { useState } from "preact/hooks"
import { LoginPage } from "../components/LoginPage"
import { useAuth } from "../stores/user"
import { TextInput } from "../components/TextInput"
import { useTheme } from "../stores/theme"
import { Block, Col, Row, Box } from "jsxstyle"
import { Submit } from "../components/Submit"

interface RegisterForm {
    email: string
    username: string
    isTeacher: boolean
    password: string
}

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [isTeacher, setTeacher] = useState(false)

    const auth = useAuth()

    const onSubmit = (e: InputEvent) => {
        e.preventDefault()
        e.stopPropagation()
        auth.register({ email, password, username: name, isTeacher })
    }

    return (
        <LoginPage>
            <Col
                component="form"
                justifyContent="space-between"
                props={{ onSubmit }}
                height="100%"
            >
                <Col height="100%">
                    <Row justifyContent="center">
                        <h1> Welcome back!</h1>
                    </Row>
                    <Block>
                        <TextInput
                            name="email"
                            placeholder="doffybox@example.com"
                            label="Email:"
                            type="email"
                            required
                            value={email}
                            onChange={setEmail}
                        />
                        <TextInput
                            name="username"
                            placeholder="Jhon Titor"
                            label="Username:"
                            type="text"
                            required
                            value={name}
                            onChange={setName}
                        />
                        <TextInput
                            name="password"
                            placeholder="password"
                            label="Password:"
                            type="password"
                            value={password}
                            onChange={setPassword}
                            required
                        />
                    </Block>
                </Col>
                <Submit />
            </Col>
        </LoginPage>
    )
}

export default Login
