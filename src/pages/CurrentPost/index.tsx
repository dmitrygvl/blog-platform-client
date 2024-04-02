import { type FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../../app/services/postApi';
import Card from '../../components/Card';
import GoBackBtn from '../../components/GoBackBtn';
import CreateComment from '../../components/CreateComment';

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
      <GoBackBtn />
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
      <div className="mt-10">
        <CreateComment />
      </div>
      <div className="mt-10">
        {data.comments
          ? data.comments.map((comment) => (
              <Card
                cardFor="comment"
                key={comment.id}
                id={id}
                avatarUrl={comment.user.avatarUrl ?? ''}
                content={comment.content}
                name={comment.user.name ?? ''}
                authorId={comment.userId}
                commentId={comment.id}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default CurrentPost;
