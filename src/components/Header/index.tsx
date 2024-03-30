import { useContext, type FC } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from '@nextui-org/react';
import { FaRegMoon } from 'react-icons/fa';
import { LuSunMedium } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';
import { ThemeContext } from '../ThemeProvider';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout, selectIsAuthenticated } from '../../features/user/userSlice';

const Header: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Blog Platform</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem
          className="lg:flex text-3xl cursor-pointer"
          onClick={() => toggleTheme()}
        >
          {theme === 'light' ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        <NavbarItem>
          {isAuthenticated && (
            <Button
              color="default"
              variant="flat"
              className="gap-2"
              onClick={handleLogout}
            >
              <CiLogout />
              <span>Выйти</span>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
