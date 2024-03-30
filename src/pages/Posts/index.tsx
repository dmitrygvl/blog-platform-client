import { type FC } from 'react';
import { useGetAllPostsQuery } from '../../app/services/postApi';
import CreatePost from '../../components/CreatePost';

const Posts: FC = () => {
  const { data } = useGetAllPostsQuery();

  return (
    <>
      <div className="mb-10 w-full">
        <CreatePost />
      </div>
    </>
  );
};

export default Posts;
