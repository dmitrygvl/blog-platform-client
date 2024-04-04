import { useEffect, type FC } from 'react';
import { Button, Card, Image, useDisclosure } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { resetUser, selectCurrentUser } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from '../../app/services/userApi';
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from '../../app/services/followApi';
import GoBackBtn from '../../components/GoBackBtn';
import { BASE_URL } from '../../constants';
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import ProfileInfo from '../../components/ProfileInfo';
import { formatToClientDate } from '../../utils/formatToClientDate';
import CountInfo from '../../components/CountInfo';

const UserProfile: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentUser = useAppSelector(selectCurrentUser);
  const { data } = useGetUserByIdQuery(id ?? '');
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery();
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetUser());
  }, []);

  const handleFollow = async () => {
    try {
      if (id) {
        data?.isFollowing
          ? await unfollowUser(id).unwrap()
          : await followUser({ followingId: id }).unwrap();

        await triggerGetUserByIdQuery(id);
        await triggerCurrentQuery();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!data) {
    return null;
  }

  return (
    <>
      <GoBackBtn />
      <div className="flex items-stretch gap-4">
        <Card className="flex flex-col items-center text-center space-y-4 p-5 flex-2">
          <Image
            src={`${BASE_URL}${data?.avatarUrl}`}
            alt={data.name}
            width={200}
            height={200}
            className="border-4 border-white"
          />
          <div className="flex flex-col text-2xl font-bold gap-4 items-center">
            {data.name}
            {currentUser?.id !== id ? (
              <Button
                onClick={handleFollow}
                color={data.isFollowing ? 'default' : 'primary'}
                variant="flat"
                className="gap-2"
                endContent={
                  data.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
              >
                {data?.isFollowing ? 'Отписаться' : 'Подписаться'}
              </Button>
            ) : (
              <Button endContent={<CiEdit />}>Редактировать</Button>
            )}
          </div>
        </Card>
        <Card className="flex flex-col space-y-4 p-5 flex-1">
          <ProfileInfo title="Почта" info={data.email} />
          <ProfileInfo title="Город" info={data.location} />
          <ProfileInfo
            title="Дата рождения"
            info={formatToClientDate(data.dateOfBirth)}
          />
          <ProfileInfo title="Обо мне" info={data.bio} />

          <div className="flex gap-2">
            <CountInfo count={data.followers.length} title="Подписчики" />
            <CountInfo count={data.following.length} title="Подписки" />
          </div>
        </Card>
      </div>
    </>
  );
};

export default UserProfile;
