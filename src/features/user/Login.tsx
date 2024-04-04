import { useState, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Link } from '@nextui-org/react';
import {
  useLazyCurrentQuery,
  useLoginMutation,
} from '../../app/services/userApi';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import { hasErrorField } from '../../utils/hasErrorField';
import ErrorMessage from '../../components/ErrorMessage';

type LoginForm = {
  email: string;
  password: string;
};

type Props = {
  setSelected: (value: string) => void;
};

const Login: FC<Props> = ({ setSelected }) => {
  const { handleSubmit, control } = useForm<LoginForm>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  const onSubmitForm = async (data: LoginForm) => {
    try {
      await login(data).unwrap();
      await triggerCurrentQuery().unwrap();
      navigate('/');
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
      }
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmitForm)}>
      <Input
        control={control}
        name="email"
        label="Email"
        type="email"
        required="Обязательное поле"
      />
      <Input
        control={control}
        name="password"
        label="Пароль"
        type="password"
        required="Обязательное поле"
      />
      <ErrorMessage error={error} />
      <p className="text-center text-small">
        Нет аккаунта?{' '}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected('signup')}
        >
          Зарегистрироваться
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Войти
        </Button>
      </div>
    </form>
  );
};

export default Login;
