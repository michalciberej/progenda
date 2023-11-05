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
      width={large ? 150 : 50}
      height={large ? 150 : 50}
      priority
      className='object-cover h-full rounded-full transition-all'
    />
  );
};

export default Avatar;
