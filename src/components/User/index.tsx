import { type FC } from 'react';
import { User as NextUiUser } from '@nextui-org/react';
import { BASE_URL } from '../../constants';

type Props = {
  name: string;
  avatarUrl: string;
  description?: string;
  className?: string;
};

const User: FC<Props> = ({
  name = '',
  avatarUrl = '',
  description = '',
  className = '',
}) => {
  return (
    <NextUiUser
      name={name}
      className={className}
      avatarProps={{ src: `${BASE_URL}${avatarUrl}` }}
      description={description}
    />
  );
};

export default User;
