import { type FC } from 'react';
import { Spinner } from '@nextui-org/react';
import { useCurrentQuery } from '../../app/services/userApi';

type Props = {
  children: JSX.Element;
};

const AuthGuard: FC<Props> = ({ children }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading) {
    return <Spinner />;
  }

  return children;
};

export default AuthGuard;
