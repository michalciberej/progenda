import LandingImage from '@/app/components/LandingImage';
import SingInForm from '@/app/components/SignInForm';

export default function SignInPage() {
  return (
    <main>
      <section className='h-full'>
        <div className='flex lg:p-10lg:space-x-5 h-full'>
          <div className='hidden lg:block relative w-1/2 rounded-lg overflow-hidden'>
            <LandingImage src={'/signinpage-image.png'} />
          </div>
          <div className='flex flex-col justify-center items-center w-full lg:w-1/2 rounded-lg border border-secondary p-6 md:p-0 space-y-10 lg:space-y-0'>
            <h1 className='block lg:hidden font-semibold text-4xl m-8'>
              Progenda
            </h1>
            <div className='flex flex-col items-start justify-center max-w-md w-full'>
              <SingInForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
