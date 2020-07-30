import "preact/compat"
import { Row, Box, Block } from "jsxstyle"
import { useTheme } from "../stores/theme"
import { useAuth } from "../stores/user"
import Link from "next/link"
import { MdAdd } from "react-icons/md"

// TODO: use an actual logo
const logoUrl =
    "https://pbs.twimg.com/profile_images/890592139792457728/P7i15LLo.jpg"

interface Props {
    height: number
}

const AuthButtons = () => {
    const commonProps = {
        component: "a",
        marginLeft: "1rem",
        border: "none",
        width: "7rem",
        borderRadius: 5,
        padding: "0.5rem",
        textAlign: "center",
        cursor: "pointer"
    }

    const { currentTheme } = useTheme()

    return (
        <>
            <Link href="/login" passhref>
                <Block
                    {...commonProps}
                    border={`3px solid ${currentTheme.primary}`}
                    props={{ href: "/login" }}
                >
                    Log in
                </Block>
            </Link>
            <Link href="/register" passhref>
                <Block
                    {...commonProps}
                    background={currentTheme.primary}
                    color={currentTheme.onPrimary}
                    props={{ href: "/register" }}
                >
                    Sign up
                </Block>
            </Link>
        </>
    )
}

const ProfileHeaderSection = () => {
    const auth = useAuth()

    if (auth.user === null) {
        return null
    }

    const CreateClassroom = () => (
        <Link href="/new/classroom">
            <a>
                <Box
                    component={MdAdd}
                    fontSize="2rem"
                    marginRight="1rem"
                    cursor="pointer"
                    props={{ title: "Create a new classroom" }}
                />
            </a>
        </Link>
    )

    return (
        <>
            {auth.user.isTeacher && <CreateClassroom />}
            <Box
                component="img"
                props={{ src: auth.profilePicture() }}
                borderRadius="50%"
                height="100%"
            />
        </>
    )
}

export const Header = ({ height }: Props) => {
    const theme = useTheme(t => t.currentTheme)
    const { user } = useAuth()

    return (
        <Row
            component="header"
            height={height}
            zIndex={10}
            background={theme.backgroundRaised}
            width="100vw"
            boxShadow="0 2px 4px 4px rgba(0, 0, 0, 0.4)"
            padding="0.5rem"
        >
            <Box
                component="img"
                props={{ src: logoUrl }}
                height="100%"
                borderRadius="50%"
                marginRight="auto"
            />
            {user === null ? <AuthButtons /> : <ProfileHeaderSection />}
        </Row>
    )
}
