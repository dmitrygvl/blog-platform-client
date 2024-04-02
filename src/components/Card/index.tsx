import { useState, type FC } from 'react';
import {
  CardBody,
  CardHeader,
  Card as NextUiCard,
  Spinner,
  CardFooter,
} from '@nextui-org/react';
import { Link, useNavigate } from 'react-router-dom';
import { RiDeleteBinLine } from 'react-icons/ri';
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from '../../app/services/likeApi';
import {
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from '../../app/services/postApi';
import { useDeleteCommentMutation } from '../../app/services/commentApi';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../../features/user/userSlice';
import { formatToClientDate } from '../../utils/formatToClientDate';
import User from '../User';
import Typography from '../Typography';
import MetaInfo from '../MetaInfo';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { FcDislike } from 'react-icons/fc';
import ErrorMessage from '../ErrorMessage';
import { FaRegComment, FaRegCommentAlt } from 'react-icons/fa';

type Props = {
  avatarUrl: string;
  name: string;
  authorId: string;
  content: string;
  cardFor: 'comment' | 'post' | 'current-post';
  commentId?: string;
  likesCount?: number;
  commentsCount?: number;
  createdAt?: Date;
  id?: string;
  likedByUser?: boolean;
};
const Card: FC<Props> = ({
  avatarUrl = '',
  name = '',
  authorId = '',
  content = '',
  cardFor = 'post',
  commentId = '',
  likesCount = 0,
  commentsCount = 0,
  createdAt,
  id = '',
  likedByUser = false,
}) => {
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
  const [triggerGetPostById] = useLazyGetPostByIdQuery();
  const [deletePost, deletePostStatus] = useDeletePostMutation();
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <NextUiCard className="mb-5">
      <CardHeader className="justify-between items-center bg-transparent">
        <Link to={`/users/${authorId}`}>
          <User
            name={name}
            className="text-small font-semibold leading-non text-default-600"
            avatarUrl={avatarUrl}
            description={createdAt && formatToClientDate(createdAt)}
          />
        </Link>
        {authorId === currentUser?.id && (
          <div className="cursor-pointer">
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <Spinner />
            ) : (
              <RiDeleteBinLine />
            )}
          </div>
        )}
      </CardHeader>
      <CardBody className="px-3 py-2 mb-5">
        <Typography>{content}</Typography>
      </CardBody>
      {cardFor !== 'comment' && (
        <CardFooter className="gap-3">
          <div className="flex gap-5 items-center">
            <div>
              <MetaInfo
                count={commentsCount}
                Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder}
              />
            </div>
            <Link to={`/posts/${id}`}>
              <MetaInfo count={commentsCount} Icon={FaRegComment} />
            </Link>
          </div>
          <ErrorMessage error={error} />
        </CardFooter>
      )}
    </NextUiCard>
  );
};

export default Card;
