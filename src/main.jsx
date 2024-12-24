import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './AuthProvider/AuthProvider';
import Home from './components/Home/Home';
import Login from './Auth/Login';
import Register from './Auth/Register';
import FindTutor from './components/FindTutor';
import PrivateRoute from './Routes/PrivateRoute';
import ErrorPage from './ErrorPage/ErrorPage';
import App from './App';
import AddTutorials from './components/AddTutorials';
import Categories from './components/Categories';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <App/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/register',
        element: <Register/>
      },
      {
        path: '/find_tutors',
        loader: () => fetch('http://localhost:2100/tutors'),
        element: <PrivateRoute><FindTutor/></PrivateRoute>
      },
      {
        path: '/find_tutors/category',
        // loader: () => fetch('http://localhost:2100/tutors'),
        element: <Categories/>
      },
      {
        path: '/add_tutorials',
        element: <PrivateRoute><AddTutorials/></PrivateRoute>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
