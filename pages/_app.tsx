import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import PlayerLayout from '../components/PlayerLayout';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (

    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
      }}
    >
      <PlayerLayout>
        <Component {...pageProps} />
      </PlayerLayout>
    </MantineProvider>

  );
}