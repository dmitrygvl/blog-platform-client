import { type FC, type ChangeEvent, useContext, useState } from 'react';
import { type User } from '../../app/types';
import { ThemeContext } from '../ThemeProvider';
import { useUpdateUserMutation } from '../../app/services/userApi';
import { useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@nextui-org/react';
import { MdOutlineEmail } from 'react-icons/md';
import Input from '../Input';
import ErrorMessage from '../ErrorMessage';
import { hasErrorField } from '../../utils/hasErrorField';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
};
const EditProfile: FC<Props> = ({ isOpen, onClose, user }) => {
  const { theme } = useContext(ThemeContext);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { id } = useParams<{ id: string }>();

  const { handleSubmit, control } = useForm<User>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: user?.email,
      name: user?.name,
      dateOfBirth: user?.dateOfBirth,
      bio: user?.bio,
      location: user?.location,
    },
  });

  const handleFileChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files !== null) {
      setSelectedFile(ev.target.files[0]);
    }
  };

  const onSubmitForm = async (data: User) => {
    if (id) {
      try {
        const formData = new FormData();
        data.name && formData.append('name', data.name);
        data.email &&
          data.email !== user?.email &&
          formData.append('email', data.email);
        data.location && formData.append('location', data.location);
        data.dateOfBirth &&
          formData.append(
            'dateOfBirth',
            new Date(data.dateOfBirth).toISOString(),
          );
        data.bio && formData.append('bio', data.bio);
        selectedFile && formData.append('avatar', selectedFile);

        await updateUser({ userData: formData, id }).unwrap();
        onClose();
      } catch (error) {
        if (hasErrorField(error)) {
          setError(error.data.error);
        }
      }
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className={`${theme} text-foregroud`}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Изменить информацию профиля
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(onSubmitForm)}
                  className="flex flex-col gap-4"
                >
                  <Input
                    control={control}
                    name="name"
                    label="Имя"
                    type="text"
                  />
                  <Input
                    control={control}
                    name="email"
                    label="Email"
                    type="email"
                    endContent={<MdOutlineEmail />}
                  />
                  <Input
                    control={control}
                    name="location"
                    label="Местоположение"
                    type="text"
                  />

                  <Input
                    control={control}
                    name="dateOfBirth"
                    label="dateOfBirth"
                    type="date"
                    placeholder="Дата рождения"
                  />
                  <Controller
                    name="bio"
                    control={control}
                    render={({ field }) => (
                      <Textarea {...field} rows={4} placeholder="О себе" />
                    )}
                  />
                  <input
                    type="file"
                    name="avatarUrl"
                    placeholder="Выберите файл"
                    onChange={handleFileChange}
                  />

                  <ErrorMessage error={error} />
                  <div className="flex gap-2 justify-end">
                    <Button
                      fullWidth
                      color="primary"
                      type="submit"
                      isLoading={isLoading}
                    >
                      Сохранить
                    </Button>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Отменить
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditProfile;
