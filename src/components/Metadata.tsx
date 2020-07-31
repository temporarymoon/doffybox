import Head from "next/head"

interface Props {
    title: string
    description: string
}

export const Metadata = ({ title, description }: Props) => {
    const fullTitle = `Doffybox | ${title}`

    return (
        <Head>
            <title> {fullTitle}</title>

            <meta property="og:title" content={fullTitle} />
            <meta property="og:type" content="website" />
            <meta property="og:description" content={description} />
            <meta name="theme-color" content="#f57c44" />
            <meta property="og:image" content="/favicon.ico" />
            <meta property="og:url" content="https://doffybox.herokuapp.com/" />
            <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        </Head>
    )
}
