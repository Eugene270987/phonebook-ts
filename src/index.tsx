import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import contactSlice from './store/contacts/contactSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

export const store = configureStore({
    reducer: {
        contacts: contactSlice,
    },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);


