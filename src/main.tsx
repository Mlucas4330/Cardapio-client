import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Form } from './components/Form.tsx';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { foodReducer } from './reducers/foodReducer.tsx';
import userReducer from './reducers/userReducer.tsx';
import { Food } from './components/Food.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/food/new',
        element: <Form />
    },
    {
        path: '/food/:id',
        element: <Food />
    },
    {
        path: '/food/:id/edit',
        element: <Form />
    }
]);

const store = configureStore({
    reducer: {
        foods: foodReducer,
        user: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
