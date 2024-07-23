import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

//Components
import App from './App.tsx';
import Home from './Components/Pages/Home/Home.tsx'
import Login from './Components/Pages/Login/Login.tsx'
import Error from './Components/Pages/Error/Error.tsx'

//NPM Dev dependencies
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  //Page Objects
  {
    path: '/',
    element: <App />,
    errorElement: <Error />
  },
  {
    path: '/home',
    element: <Home />,
    errorElement: <Error />
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />
  },
  {
    path: '/error',
    element: <Error />,
    errorElement: <Error />
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router= {router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
