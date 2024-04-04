import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '@nextui-org/react';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../../features/user/userSlice';
import User from '../../components/User';

const Followers: FC = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  if (!currentUser) {
    return null;
  }
  return currentUser.followers.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.followers.map((user) => (
        <Link to={`/users/${user.follower.id}`} key={user.follower.id}>
          <Card>
            <CardBody className="blok">
              <User
                name={user.follower.name ?? ''}
                avatarUrl={user.follower.avatarUrl ?? ''}
                description={user.follower.email ?? ''}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <p className="text-center">У вас пока нет подписчиков</p>
  );
};

export default Followers;
