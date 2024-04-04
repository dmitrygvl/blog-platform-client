import React, { type FC } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import Auth from './pages/Auth';
import Layout from './components/Layout';
import { store } from './app/store';
import Posts from './pages/Posts';
import UserProfile from './pages/UserProfile';
import CurrentPost from './pages/CurrentPost';
import Followers from './pages/Followers';
import Following from './pages/Following';
import AuthGuard from './features/user/AuthGuard';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Posts />,
      },
      {
        path: 'posts/:id',
        element: <CurrentPost />,
      },
      {
        path: 'users/:id',
        element: <UserProfile />,
      },
      {
        path: 'followers',
        element: <Followers />,
      },
      {
        path: 'following',
        element: <Following />,
      },
    ],
  },
]);

const App: FC = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <NextUIProvider>
          <ThemeProvider>
            <AuthGuard>
              <RouterProvider router={router} />
            </AuthGuard>
          </ThemeProvider>
        </NextUIProvider>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
