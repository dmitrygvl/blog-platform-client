import { useEffect, type FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Container from '../Container';
import Navbar from '../Navbar';
import { selectIsAuthenticated, selectUser } from '../../features/user/userSlice';
import { useAppSelector } from '../../app/hooks';
// import { useSelector } from 'react-redux';


const Layout: FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [])
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
        <div>PROFILE</div>
      </Container>
    </>
  );
};

export default Layout;
