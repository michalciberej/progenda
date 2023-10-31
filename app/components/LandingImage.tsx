import Image from 'next/image';

const LandingImage = ({ src }: { src: string }) => {
  return (
    <>
      <Image
        src={src}
        alt='Abstract painting'
        fill
        priority
        className='object-cover'
      />
      <h1 className='absolute top-0 left-0 font-semibold text-white text-5xl m-8'>
        Progenda
      </h1>
    </>
  );
};

export default LandingImage;
