'use client';

import { List } from '@prisma/client';
import StyledButton from './buttons/StyledButton';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { pusherClient } from '../lib/pusher';

const ListSettings = ({ lists }: { lists: List[] }) => {
  const [allLists, setAllLists] = useState<List[]>(lists);

  const handleListDelete = async (id: string) => {
    axios
      .post('/api/deleteList', id)
      .then(() => {
        toast.success('List deleted!');
      })
      .catch(() => toast.error('Something went wrong!'));
  };

  useEffect(() => {
    pusherClient.subscribe('new-list');

    const listHandler = (list: List) => {
      setAllLists(allLists.concat(list));
    };

    pusherClient.bind('list:new', listHandler);

    return () => {
      pusherClient.unsubscribe('new-list');
      pusherClient.unbind('list:new', listHandler);
    };
  }, [allLists]);

  useEffect(() => {
    pusherClient.subscribe('delete-list');

    const listHandler = (oldList: List) => {
      setAllLists(allLists.filter((list) => list.id !== oldList.id));
    };

    pusherClient.bind('list:delete', listHandler);

    return () => {
      pusherClient.unsubscribe('delete-list');
      pusherClient.unbind('list:delete', listHandler);
    };
  }, [allLists]);

  return (
    <div className='flex flex-col space-y-2'>
      {allLists.map((list, index) => (
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
