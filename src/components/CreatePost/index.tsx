import { type FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Textarea } from '@nextui-org/react';
import { IoMdCreate } from 'react-icons/io';
import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from '../../app/services/postApi';
import ErrorMessage from '../ErrorMessage';

const CreatePost: FC = () => {
  const [createPost] = useCreatePostMutation();
  const [triggerAllPosts] = useLazyGetAllPostsQuery();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const error = errors?.post?.message as string;

  const onSubmitForm = handleSubmit(async (data) => {
    try {
      await createPost({ content: data.post }).unwrap();
      setValue('post', '');
      await triggerAllPosts().unwrap();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form className="flex-grow pb-5" onSubmit={onSubmitForm}>
      <Controller
        name="post"
        control={control}
        defaultValue=""
        rules={{
          required: 'Обязательное поле',
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="Ваш новый пост"
            className="mb-5"
          />
        )}
      />
      {errors && <ErrorMessage error={error} />}
      <Button
        color="success"
        className="flex-end"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Опубликовать
      </Button>
    </form>
  );
};

export default CreatePost;
