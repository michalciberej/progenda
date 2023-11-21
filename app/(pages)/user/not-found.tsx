const NotFoundPage = () => {
  return (
    <section className='flex items-center flex-col justify-center w-full h-full border rounded-lg border-background_DM/10 dark:border-background_LM/10 space-y-2'>
      <h1 className='text-2xl font-semibold'>404 | PAGE NOT FOUND</h1>
      <p className='max-w-sm text-center'>
        The page you are looking for might have been removed, had its name
        changed or is temporarily unavailable.
      </p>
    </section>
  );
};

export default NotFoundPage;
