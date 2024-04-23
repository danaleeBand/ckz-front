export type AvatarProps = {
  imageUrl: string;
  className?: string;
  onClick?: (imageUrl: string) => void;
};

export const Avatar = ({ imageUrl, className, onClick }: AvatarProps) => {
  return (
    <img
      src={imageUrl}
      className={`flex w-10 h-10 border rounded-full 
          border-border-basic dark:border-dark-border-basic
          ${onClick && 'cursor-pointer'}
          ${className}`}
      onClick={() => onClick?.(imageUrl)}
      alt='프로필 이미지'
    />
  );
};
