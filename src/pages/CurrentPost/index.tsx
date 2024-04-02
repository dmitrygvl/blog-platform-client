import { type FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../../app/services/postApi';
import Card from '../../components/Card';

const CurrentPost: FC = () => {
  const params = useParams<{ id: string }>();
  const { data } = useGetPostByIdQuery(params?.id ?? '');

  if (!data) {
    return <h2>Пост не найден</h2>;
  }

  const {
    id,
    author,
    authorId,
    content,
    comments,
    likes,
    likedByUser,
    createdAt,
  } = data;

  return (
    <>
      <Card
        cardFor="current-post"
        avatarUrl={author.avatarUrl ?? ''}
        content={content}
        name={author.name ?? ''}
        likesCount={likes.length}
        commentsCount={comments.length}
        authorId={authorId}
        likedByUser={likedByUser}
        createdAt={createdAt}
        id={id}
      />
    </>
  );
};

export default CurrentPost;
