import { type FC } from 'react';
import { useGetAllPostsQuery } from '../../app/services/postApi';
import CreatePost from '../../components/CreatePost';
import Card from '../../components/Card';

const Posts: FC = () => {
  const { data } = useGetAllPostsQuery();

  return (
    <>
      <div className="mb-10 w-full">
        <CreatePost />
        {data && data.length > 0
          ? data.map(
              ({
                id,
                content,
                author,
                authorId,
                comments,
                likes,
                likedByUser,
                createdAt,
              }) => (
                <Card
                  key={id}
                  id={id}
                  avatarUrl={author.avatarUrl ?? ''}
                  content={content}
                  name={author.name ?? ''}
                  likesCount={likes.length}
                  commentsCount={comments.length}
                  authorId={authorId}
                  likedByUser={likedByUser}
                  createdAt={createdAt}
                  cardFor="post"
                />
              ),
            )
          : null}
      </div>
    </>
  );
};

export default Posts;
