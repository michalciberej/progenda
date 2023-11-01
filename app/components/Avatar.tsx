import Image from 'next/image';

import { User } from '@prisma/client';

interface AvatarProps {
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <Image
      src={user?.image || '/placeholder.jpg'}
      alt={'Avatar'}
      width={50}
      height={50}
      priority
      className='object-cover h-full rounded-full'
    />
  );
};

export default Avatar;
