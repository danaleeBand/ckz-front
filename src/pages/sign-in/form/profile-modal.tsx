import { memo } from 'react';
import { BOTTTS_AVATAR_NAMES } from '@/constants';
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';

export type ProfileModalProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  onAvatarSelected: (url: string) => void;
};

export const ProfileModalButton = memo(
  ({ isOpen, onOpenChange, onAvatarSelected }: ProfileModalProps) => {
    const handleOnclick = (url: string) => {
      onAvatarSelected?.(url);
    };

    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogTrigger>
          <Button
            type='outlined'
            labelText='기본 프로필'
            size='small'
            className=''
          />
        </DialogTrigger>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>기본 프로필 선택</DialogTitle>
          </DialogHeader>
          <div className='flex flex-wrap justify-center items-center gap-2'>
            {BOTTTS_AVATAR_NAMES.map(name => {
              return (
                <Avatar
                  key={name}
                  imageUrl={`https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${name}`}
                  className='w-14 h-14 hover:shadow-md hover:brightness-75'
                  onClick={handleOnclick}
                />
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    );
  },
);
