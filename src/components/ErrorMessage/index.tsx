import { type FC } from 'react';

type Props = {
  error?: string;
};

const ErrorMessage: FC<Props> = ({ error = '' }) => {
  return error && <p className="text-red-500 text-small">{error}</p>;
};

export default ErrorMessage;
