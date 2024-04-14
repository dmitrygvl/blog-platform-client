import { type FC } from 'react';
import { type IconType } from 'react-icons';

type Props = {
  count: number;
  Icon: IconType;
};

const MetaInfo: FC<Props> = ({ count, Icon }) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      {count > 0 && (
        <p className="font-semibold text-default-400 text-1"> {count}</p>
      )}
      <p className="text-default-400 text-xl hover:text-2xl ease-in duration-100">
        <Icon />
      </p>
    </div>
  );
};

export default MetaInfo;
