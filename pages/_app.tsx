import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import PlayerLayout from '../components/PlayerLayout';

export default function App({ Component, pageProps }) {

  return (

    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
      }}
    >
      {/* Display layout if page isn't an authentication page */}
      {Component.isAuthPage ? (
        <Component {...pageProps} />
      ) : (
        <PlayerLayout>
          <Component {...pageProps} />
        </PlayerLayout>
      )}

    </MantineProvider>

  );
}