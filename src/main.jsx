import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();


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
import TutorDetails from './components/TutorDetails';
import MyBookedTutor from './components/MyBookedTutor';
import MyTutorials from './components/MyTutorials';
import UpdateTutorials from './components/UpdateTutorials';
import About from './components/About';
import Dashboard from './Dashboard/Dashboard';
import DashboardHome from './Dashboard/DashboardHome';
import BecomeTutor from './components/BecomeTutor/BecomeTutor';
import Application from './Dashboard/Application';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <div className='text-center'>Loading...</div>,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/find_tutors',
        element: <FindTutor />
      },
      {
        path: '/find_tutors/category',
        element: <Categories />
      },
      {
        path: '/become_tutor',
        element: <BecomeTutor />
      },
      {
        path: '/tutor_details/:id',
        loader: ({ params }) => fetch(`https://online-tutor-server-web.vercel.app/tutors/tutor/${params.id}`),
        element: <TutorDetails />
      },
      {
        path: '/my_booked_tutor',
        element: <PrivateRoute><MyBookedTutor /></PrivateRoute>
      },

      {
        path: '/update_tutorials/:_id',
        loader: ({ params }) => fetch(`https://online-tutor-server-web.vercel.app/tutors/tutor/${params._id}`),
        element: <PrivateRoute><UpdateTutorials /></PrivateRoute>
      },
      {
        path: '/about',
        element: <About />
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/dashboard',
        element: <PrivateRoute><DashboardHome /></PrivateRoute>
      },
      {
        path: '/dashboard/application',
        element: <PrivateRoute><Application /></PrivateRoute>
      },
      {
        path: '/dashboard/add_tutorials',
        element: <PrivateRoute><AddTutorials /></PrivateRoute>
      },
      {
        path: '/dashboard/my_tutorials',
        element: <PrivateRoute><MyTutorials /></PrivateRoute>
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='max-w-7xl mx-auto scroll-smooth'>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router}>
          </RouterProvider>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>,
)
