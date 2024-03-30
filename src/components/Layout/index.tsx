import { useEffect, type FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  selectIsAuthenticated,
  selectUser,
} from '../../features/user/userSlice';
import { useAppSelector } from '../../app/hooks';
import Header from '../Header';
import Container from '../Container';
import Navbar from '../Navbar';
import Profile from '../Profile';

const Layout: FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <Navbar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
        <div className="flex-2 p-4">
          <div className="flex-col flex gap-5">{!user && <Profile />}</div>
        </div>
      </Container>
    </>
  );
};

export default Layout;
