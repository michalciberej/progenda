'use client';

import { List } from '@prisma/client';
import StyledButton from './buttons/StyledButton';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const ListSettings = ({ lists }: { lists: List[] }) => {
  const router = useRouter();
  const handleListDelete = async (id: string) => {
    console.log(id);
    axios
      .post('/api/deleteList', id)
      .then(() => {
        toast.success('List deleted!');
        router.refresh();
      })
      .catch(() => toast.error('Something went wrong!'));
  };

  return (
    <div className='flex flex-col space-y-2'>
      {lists.map((list, index) => (
        <div
          key={index}
          className='flex justify-between items-center'>
          <div className='flex space-x-2'>
            <div
              className='w-5 h-5 rounded-sm'
              style={{ backgroundColor: list.color }}
            />
            <span>{list.title}</span>
          </div>
          <StyledButton
            accent
            func={() => handleListDelete(list.id)}>
            Delete
          </StyledButton>
        </div>
      ))}
    </div>
  );
};

export default ListSettings;
