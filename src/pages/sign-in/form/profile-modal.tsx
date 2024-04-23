import { memo } from 'react';
import ReactModal from 'react-modal';
import { BOTTTS_AVATAR_NAMES } from '@/constants';
import { Avatar } from '@/components/ui';

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100%',
    zIndex: 10,
    position: 'fixed',
    top: 0,
    left: 0,
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    WebkitOverflowScrolling: 'touch',
  },
};

export type ProfileModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
  onAvatarSelected: (url: string) => void;
};

export const ProfileModal = memo(
  ({ toggleModal, isOpen, onAvatarSelected }: ProfileModalProps) => {
    const handleOnclick = (url: string) => {
      onAvatarSelected?.(url);
    };

    return (
      <ReactModal
        isOpen={isOpen}
        shouldCloseOnOverlayClick
        onRequestClose={() => toggleModal()}
        style={customModalStyles}
        className={`flex flex-wrap justify-center items-center w-44 p-2 gap-2
          bg-bg-basic dark:bg-dark-bg-basic rounded-md shadow-md`}
      >
        {BOTTTS_AVATAR_NAMES.map(name => {
          return (
            <Avatar
              key={name}
              imageUrl={`https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${name}`}
              className='w-8 h-8 hover:shadow-md hover:brightness-75'
              onClick={handleOnclick}
            />
          );
        })}
      </ReactModal>
    );
  },
);
