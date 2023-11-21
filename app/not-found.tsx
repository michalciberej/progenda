import Link from 'next/link';

const notFound = () => {
  return (
    <main className='h-full'>
      <section className='h-full'>
        <div className='h-full flex flex-col items-center justify-center space-y-4'>
          <span className='text-9xl font-bold bg-gradient-to-tr from-primary_LM to-accent_LM bg-clip-text text-transparent'>
            Oops!
          </span>
          <h1 className='font-semibold text-2xl'>404 | PAGE NOT FOUND</h1>
          <p className='max-w-sm text-center text-sm opacity-60'>
            The page you are looking for might have been removed, had its name
            changed or is temporarily unavailable.
          </p>
          <Link
            href={'/'}
            className='mt-8 bg-gradient-to-tr from-primary_LM to-accent_LM rounded-full py-2 px-3 text-text_DM font-bold shadow-md transition-all hover:-translate-y-1 hover:shadow-lg'>
            GO TO HOMEPAGE
          </Link>
        </div>
      </section>
    </main>
  );
};

export default notFound;
