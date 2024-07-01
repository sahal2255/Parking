import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from 'react-redux'; // Corrected import
import { store,persistor } from './Redux/Store'; // Assuming you named the store file correctly
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
