import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Fragment } from 'react';
import { Navbar } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    router.pathname.includes("auth") ?
      <Component {...pageProps} />
      :
      <Fragment>
        <Navbar />
        <Component {...pageProps} />
      </Fragment>
  )
}

export default MyApp
