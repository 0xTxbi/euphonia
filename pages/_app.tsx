import { StoreProvider } from 'easy-peasy';
import { MantineProvider } from '@mantine/core';
import PlayerLayout from '../components/PlayerLayout';
import { store } from '../lib/store';
import { NotificationsProvider } from '@mantine/notifications'

export default function App({ Component, pageProps }) {

  return (

    <StoreProvider store={store}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark',
        }}
      >

        <NotificationsProvider position="top-right" zIndex={2500}>
          {/* Display layout if page isn't an authentication page */}
          {Component.isAuthPage ? (
            <Component {...pageProps} />
          ) : (
            <PlayerLayout>
              <Component {...pageProps} />
            </PlayerLayout>
          )}
        </NotificationsProvider>
      </MantineProvider>
    </StoreProvider>

  );
}