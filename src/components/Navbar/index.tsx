import type { FC } from 'react';
import { BsPostcard } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';
import NavButton from '../NavButton';

const Navbar: FC = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-5">
        <li>
          <NavButton href="/" icon={<BsPostcard />}>
            Посты
          </NavButton>
        </li>
        <li>
          <NavButton href="following" icon={<FaUsers />}>
            Подписки
          </NavButton>
        </li>
        <li>
          <NavButton href="followers" icon={<FaUsers />}>
            Подписчики
          </NavButton>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
