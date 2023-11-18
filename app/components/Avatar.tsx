import Image from 'next/image';
import { User } from '@prisma/client';

interface AvatarProps {
  user?: User;
  large?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ user, large }) => {
  return (
    <Image
      src={user?.image || '/placeholder.jpg'}
      alt={'Avatar'}
      width={large ? 100 : 50}
      height={large ? 100 : 50}
      priority
      className='object-cover h-full rounded-full'
    />
  );
};

export default Avatar;
