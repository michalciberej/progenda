'use client';

import { User } from '@prisma/client';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { CldUploadButton } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Modal from './Modal';
import Image from 'next/image';
import StyledButton from '../buttons/StyledButton';
import clsx from 'clsx';

interface SettingsModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, setValue } = useForm<FieldValues>({
    defaultValues: {
      name: user.name,
      image: user.image,
    },
  });
  const router = useRouter();

  const image = watch('image');

  const handleUpload = (result: any) => {
    setValue('image', result.info.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    setIsLoading(true);

    axios
      .post('/api/settings', formData)
      .then(() => {
        toast.success('User information updated!');
        router.refresh();
        onClose();
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-12'>
          <div className='border-b border-background_DM/20 dark:border-background_LM/20 pb-12'>
            <h2
              className='
                text-base 
                text-text_LM
                dark:text-text_DM
                font-semibold 
                leading-7 
                
              '>
              Profile
            </h2>
            <p className='mt-1 text-sm leading-6 text-text_LM/90 dark:text-text_DM/90'>
              Edit your public information.
            </p>

            <div className='mt-10 flex flex-col gap-y-8'>
              <input
                type='text'
                {...register('name', { disabled: isLoading })}
                className={clsx(
                  `
                text-text_LM
                dark:text-text_DM
                bg-transparent
                text-xl
                border-2
                rounded-md
                px-2
                py-1
                border-background_DM/20
                dark:border-background_LM/20`,
                  isLoading && 'opacity-75 cursor-default'
                )}
              />
              <div>
                <label
                  htmlFor='photo'
                  className='
                    block 
                    text-sm 
                    font-medium 
                    leading-6
                    text-text_LM
                    dark:text-text_DM
                  '>
                  Photo
                </label>
                <div className='mt-2 flex items-center gap-x-3'>
                  <Image
                    width='48'
                    height='48'
                    className='rounded-full'
                    src={image || user?.image || '/placeholder.jpg'}
                    alt='Avatar'
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset='pn8cjg8x'>
                    <StyledButton
                      disabled={isLoading}
                      secondary
                      type='button'>
                      Change
                    </StyledButton>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className='
            mt-6 
            flex 
            items-center 
            justify-end 
            gap-x-6
          '>
          <StyledButton
            disabled={isLoading}
            secondary
            type='button'
            func={onClose}>
            Cancel
          </StyledButton>
          <StyledButton
            disabled={isLoading}
            primary>
            Save
          </StyledButton>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
