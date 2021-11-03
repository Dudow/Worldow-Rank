import Head from 'next/head';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/static/logo.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
