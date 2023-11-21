'use client';

import { ListWithTaskCount } from '@/typings';
import Modal from './Modal';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ListModalProps {
  isOpen: boolean;
  onClose: () => void;
  lists: ListWithTaskCount[];
}

const ListModal: React.FC<ListModalProps> = ({ isOpen, onClose, lists }) => {
  const listDeleteHandle = (listId: string) => {
    axios
      .post('/api/deleteList', listId)
      .then(() => toast.success('List removed!'))
      .catch(() => toast.error('Something went wrong!'));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}>
      <div
        className='
                text-text_LM
                dark:text-text_DM'>
        <h2
          className='
                text-base
                font-semibold 
                leading-7 
                mb-4
              '>
          Lists
        </h2>
        <ul className='flex w-full flex-col space-y-2'>
          {lists.map((list, index) => (
            <li
              key={index}
              className='text-text_LM dark:text-text_DM px-2 py-1 text-lg rounded-md flex items-center justify-between'
              style={{ backgroundColor: list.color }}>
              <span>
                {list.title.charAt(0).toUpperCase() + list.title.slice(1)}
              </span>
              <button
                type='button'
                aria-label='Delete list'
                onClick={() => listDeleteHandle(list.id)}>
                <IoClose />
              </button>
            </li>
          ))}
        </ul>
        <p className='mt-4 text-center'>
          Warning: Deleting list will also delete all related tasks!
        </p>
      </div>
    </Modal>
  );
};

export default ListModal;
