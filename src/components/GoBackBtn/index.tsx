import { type FC } from 'react';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const GoBackBtn: FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="text-default-500 flex items-center gap-2 mb-10 cursor-pointer"
      onClick={handleGoBack}
    >
      <FaRegArrowAltCircleLeft />
      Назад
    </div>
  );
};

export default GoBackBtn;
