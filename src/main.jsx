import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Root } from './components/Root';
import { Home } from './components/pages/Home';
import { NotFound } from './components/shared/NotFound';
import { Details } from './components/pages/Details';
import { SignIn } from './components/pages/SignIn';
import { Signup } from './components/pages/Signup';
import AuthProvider from './components/providers/authProviders';
import { PrivateRoute } from './components/utils/PrivateRoute';
import { UpdateProfile } from './components/pages/UpdateProfile';
import { SavedEvents } from './components/pages/SavedEvents';
import { BookAppointment } from './components/pages/BookAppointment';
import { Payment } from './components/pages/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { DatabaseProvier } from './components/providers/databaseProvider';
import { Booked } from './components/pages/Booked';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPEAPIKEY);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    loader: async () => await fetch('/events.json'),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/event/:id',
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: '/saved',
        element: (
          <PrivateRoute>
            <SavedEvents />
          </PrivateRoute>
        ),
      },
      {
        path: '/book',
        element: (
          <PrivateRoute>
            <BookAppointment />
          </PrivateRoute>
        ),
      },
      {
        path: '/payment/:id',
        element: (
          <PrivateRoute>
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </PrivateRoute>
        ),
      },
      {
        path: '/booked',
        element: <PrivateRoute><Booked/></PrivateRoute>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <DatabaseProvier>
        <RouterProvider router={router}></RouterProvider>
      </DatabaseProvier>
    </AuthProvider>
  </React.StrictMode>
);
