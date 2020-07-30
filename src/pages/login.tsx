import "preact/compat"
import { useState } from "preact/hooks"
import { LoginPage } from "../components/LoginPage"
import { useForm } from "react-hook-form"
import { useAuth } from "../stores/user"
import { TextInput } from "../components/TextInput"
import { useTheme } from "../stores/theme"
import { Block, Col, Row, Box } from "jsxstyle"
import { Submit } from "../components/Submit"

interface LoginForm {
    email: string
    password: string
}

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { currentTheme } = useTheme()

    const auth = useAuth()

    const onSubmit = (e: InputEvent) => {
        e.preventDefault()
        e.stopPropagation()
        auth.login({ email, password })
    }

    return (
        <LoginPage>
            <Block component="form" props={{ onSubmit }} height="100%">
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
                            name="password"
                            placeholder="password"
                            label="Password:"
                            type="password"
                            value={password}
                            onChange={setPassword}
                            required
                        />
                    </Block>
                    <Row justifyContent="flex-end" marginTop="auto">
                        <Submit />
                    </Row>
                </Col>
            </Block>
        </LoginPage>
    )
}

export default Login
