import { type FC } from 'react';
import { Card, Image, CardHeader, CardBody } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { MdAlternateEmail } from 'react-icons/md';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../../features/user/userSlice';
import { BASE_URL } from '../../constants';

const Profile: FC = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  if (!currentUser) {
    return null;
  }

  const { name, email, avatarUrl, id } = currentUser;
  return (
    <Card className="py-4 w-[302px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <Image
          alt="Profile card"
          className="object-cover rounded-xl"
          src={`${BASE_URL}${avatarUrl}`}
          width={370}
        />
      </CardHeader>
      <CardBody>
        <Link to={`/users/${id}`}>
          <h4 className="font-bold text-large mb-2">{name}</h4>
        </Link>
        <p className="text-default-500 flex items-center gap-2">
          <MdAlternateEmail /> {email}
        </p>
      </CardBody>
    </Card>
  );
};

export default Profile;
