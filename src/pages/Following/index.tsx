import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '@nextui-org/react';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../../features/user/userSlice';
import User from '../../components/User';

const Following: FC = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  if (!currentUser) {
    return null;
  }
  return currentUser.following.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.following.map((user) => (
        <Link to={`/users/${user.following.id}`} key={user.following.id}>
          <Card>
            <CardBody className="blok">
              <User
                name={user.following.name ?? ''}
                avatarUrl={user.following.avatarUrl ?? ''}
                description={user.following.email ?? ''}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <p className="text-center">У вас пока нет подписок</p>
  );
};

export default Following;
