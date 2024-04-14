import { Button as NextButton } from '@nextui-org/react';
import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  icon?: JSX.Element;
  className: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined;
};

const Button: FC<Props> = ({
  children,
  icon,
  className,
  type,
  fullWidth,
  color,
}) => {
  return (
    <NextButton
      startContent={icon}
      size="lg"
      color={color}
      variant="light"
      className={className}
    >
      {children}
    </NextButton>
  );
};

export default Button;
