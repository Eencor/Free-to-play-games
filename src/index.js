import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import {store} from './store/store';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import 'antd/dist/antd';

import Main from './pages/main';
import GamePage from './pages/gamePage';
import ErrorPage from './pages/errorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '',
        element: <Main/>
      },
      {
        path: ':id',
        element: <GamePage/>,
      }
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store = {store}>
    <RouterProvider router = {router}/>
  </Provider>

);

