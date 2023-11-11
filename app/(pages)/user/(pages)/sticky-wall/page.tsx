import getNotes from '@/app/actions/getNotes';
import NoteCard from '@/app/components/notes/NoteCard';
import NoteForm from '@/app/components/notes/NoteForm';

const StickyWallPage = async () => {
  const notes = await getNotes();

  return (
    <div className='w-full h-full flex flex-col space-y-6'>
      <section className='flex items-center justify-between'>
        <h1 className='text-5xl my-4'>Sticky Wall</h1>
      </section>
      <section className='h-full'>
        <ul className='h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:grid-rows-2 gap-4 rounded-xl'>
          {notes.map((note, index) => (
            <NoteCard
              key={index}
              note={note}
            />
          ))}
          {notes.length < 8 && <NoteForm />}
        </ul>
      </section>
    </div>
  );
};

export default StickyWallPage;
