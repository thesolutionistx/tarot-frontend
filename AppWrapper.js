import { Provider } from 'react-redux';
import store from './store';

function AppWrapper({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default AppWrapper;
