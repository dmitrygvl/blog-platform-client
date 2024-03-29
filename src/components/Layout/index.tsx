import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Container from '../Container';
import Navbar from '../Navbar';

const Layout: FC = () => {
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
