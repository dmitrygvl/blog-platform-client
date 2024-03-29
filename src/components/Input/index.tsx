import { Input as NextInput } from '@nextui-org/react';
import { type FC } from 'react';
import { useController, type Control } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
  control: Control<any>;
  required?: string;
  placeholder?: string;
  type?: string;
  endContent?: JSX.Element;
};

const Input: FC<Props> = ({
  name,
  label,
  control,
  required = '',
  placeholder,
  type,
  endContent,
}) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: {
      required,
    },
  });

  return (
    <NextInput
      id={name}
      label={label}
      type={type}
      placeholder={placeholder}
      value={field.value}
      name={field.name}
      isInvalid={invalid}
      onChange={field.onChange}
      onBlur={field.onBlur}
      errorMessage={`${errors[name]?.message ?? ''}`}
    />
  );
};

export default Input;
