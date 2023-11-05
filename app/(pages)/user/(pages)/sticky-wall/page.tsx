const StickyWallPage = () => {
  return (
    <div className='w-full'>
      <section>
        <h1 className='text-5xl relative z-10 my-4'>Sticky Wall</h1>
      </section>
      <div className='w-full h-full min-h-full'>
        <ul className='border flex flex-wrap gap-4 rounded-xl p-5'>
          <li className='w-full max-w-sm h-80 bg-yellow-800 rounded-lg'></li>
          <li className='w-full max-w-sm h-80 bg-red-800 rounded-lg'></li>
          <li className='w-full max-w-sm h-80 bg-blue-800 rounded-lg'></li>
          <li className='w-full max-w-sm h-80 bg-green-800 rounded-lg'></li>
          <li className='w-full max-w-sm h-80 bg-pink-800 rounded-lg'></li>
        </ul>
      </div>
    </div>
  );
};

export default StickyWallPage;
