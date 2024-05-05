//using react toolkits
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.js'
// import { Provider } from 'react-redux'
// import { store } from './services/store.js'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//        <App />
//     </Provider>
    
//   </React.StrictMode>,
// )


//using axios
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStateProvider } from './services/GlobalStateProvider';
import { store } from './services/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStateProvider store= {store}>
      <App />
    </GlobalStateProvider>
  </React.StrictMode>,
);
