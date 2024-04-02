import { type FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Textarea } from '@nextui-org/react';
import { IoMdCreate } from 'react-icons/io';
import { useLazyGetPostByIdQuery } from '../../app/services/postApi';
import ErrorMessage from '../ErrorMessage';
import { useParams } from 'react-router-dom';
import { useCreateCommentMutation } from '../../app/services/commentApi';

const CreateComment: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [createComment] = useCreateCommentMutation();
  const [getPostById] = useLazyGetPostByIdQuery();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const error = errors?.post?.message as string;

  const onSubmitForm = handleSubmit(async (data) => {
    try {
      if (id) {
        await createComment({ content: data.comment, postId: id }).unwrap();
        setValue('comment', '');
        await getPostById(id).unwrap();
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form className="flex-grow pb-5" onSubmit={onSubmitForm}>
      <Controller
        name="comment"
        control={control}
        defaultValue=""
        rules={{
          required: 'Обязательное поле',
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="Ваш комментарий"
            className="mb-5"
          />
        )}
      />
      {errors && <ErrorMessage error={error} />}

      <Button
        color="primary"
        className="flex-end"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Ответить
      </Button>
    </form>
  );
};

export default CreateComment;
