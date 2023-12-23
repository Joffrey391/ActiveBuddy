import DefaultLayout from '@/components/layout/DefaultLayout'
import '@/styles/globals.css'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

interface Props {
    session?: Session | null
}

export default function App({ Component, pageProps }: AppProps<Props>) {
    return (
        <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
        </SessionProvider>
    )

}
