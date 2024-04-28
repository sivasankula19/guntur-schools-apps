import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

const PersistApp: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default PersistApp;
