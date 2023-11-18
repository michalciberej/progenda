import getNotes from '@/app/actions/getNotes';
import MobileMenuButton from '@/app/components/buttons/MobileMenuButton';
import NoteContainer from '@/app/components/notes/NoteContainer';

const StickyWallPage = async () => {
  const notes = await getNotes();

  return (
    <div className='w-full h-full flex flex-col space-y-6'>
      <section className='flex items-center text-3xl md:text-4xl lg:text-5xl'>
        <MobileMenuButton />
        <h1 className='my-4'>Sticky Wall</h1>
      </section>
      <section className='h-full overflow-auto'>
        <NoteContainer notes={notes} />
      </section>
    </div>
  );
};

export default StickyWallPage;
