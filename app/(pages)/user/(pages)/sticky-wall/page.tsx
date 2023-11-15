import getNotes from '@/app/actions/getNotes';
import NoteCard from '@/app/components/notes/NoteCard';
import NoteContainer from '@/app/components/notes/NoteContainer';
import NoteForm from '@/app/components/notes/NoteForm';

const StickyWallPage = async () => {
  const notes = await getNotes();

  return (
    <div className='w-full h-full flex flex-col space-y-6'>
      <section className='flex items-center justify-between'>
        <h1 className='text-5xl my-4'>Sticky Wall</h1>
      </section>
      <section className='h-full'>
        <NoteContainer notes={notes} />
      </section>
    </div>
  );
};

export default StickyWallPage;
