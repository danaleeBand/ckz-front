import { memo, useEffect, useRef, useState } from 'react';
import { Avatar, Button } from '@/components/ui';
import { BOTTTS_AVATAR_NAMES, BOTTTS_AVATAR_URL_PREFIX } from '@/constants';
import { ProfileModal } from './profile-modal';
import { useModalStore } from '@/stores';

export type ProfileImageInputProps = {
  setImage: (url: string) => void;
};

export const ProfileImageInput = memo(
  ({ setImage }: ProfileImageInputProps) => {
    const { isModalOpen, toggleModal } = useModalStore();
    const inputRef = useRef<HTMLInputElement>(null);
    const [imageUrl, setImageUrl] = useState<string>();

    // 기본 프로필 이미지 설정
    useEffect(() => {
      const profileNumber = Math.floor(
        Math.random() * BOTTTS_AVATAR_NAMES.length,
      );
      const avatarUrl = `${BOTTTS_AVATAR_URL_PREFIX}${BOTTTS_AVATAR_NAMES[profileNumber]}`;
      setImage?.(avatarUrl);
      setImageUrl(avatarUrl);
    }, [setImage]);

    // '사진 업로드' 기능
    const handleSelectFileButtonOnClick = () => {
      inputRef?.current?.click();
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target?.files;
      if (selectedFile) {
        const newFile = selectedFile[0];
        if (newFile.type.startsWith('image/')) {
          const url = URL.createObjectURL(newFile);
          setImage?.(url);
          setImageUrl(url);
        } else {
          alert('이미지 파일만 선택해주세요.');
        }
      }
    };

    // '기본 프로필' 기능
    const handleModalButtonOnClick = () => {
      toggleModal();
    };
    const handleAvatarChanged = (url: string) => {
      setImage?.(url);
      setImageUrl(url);
      toggleModal();
    };

    return (
      <div className='flex flex-row gap-6 items-center'>
        <Avatar imageUrl={imageUrl ?? ''} className='w-16 h-16' />
        <div className='flex flex-row gap-2'>
          <Button
            type='outlined'
            labelText='사진 업로드'
            size='small'
            onClick={handleSelectFileButtonOnClick}
          />
          <Button
            type='outlined'
            labelText='기본 프로필'
            size='small'
            className=''
            onClick={handleModalButtonOnClick}
          />
        </div>
        <input
          type='file'
          accept='image/*'
          ref={inputRef}
          onChange={handleFileChange}
          hidden
        />
        {isModalOpen && (
          <ProfileModal
            toggleModal={toggleModal}
            isOpen={isModalOpen}
            onAvatarSelected={handleAvatarChanged}
          />
        )}
      </div>
    );
  },
);
