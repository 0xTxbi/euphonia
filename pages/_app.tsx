import PlayerLayout from '../components/PlayerLayout';
import '../styles/global.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <PlayerLayout>
      <Component {...pageProps} />
    </PlayerLayout>
  );
}

export default MyApp;
