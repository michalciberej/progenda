import LandingImage from './components/LandingImage';
import StyledLink from './components/buttons/StyledLinks';

export default function Home() {
  return (
    <main>
      <section>
        <div className='flex lg:p-10 bg-background_LM dark:bg-background_DM lg:space-x-5 h-full text-text_LM'>
          <div className='hidden lg:block relative w-1/2 rounded-lg overflow-hidden'>
            <LandingImage src={'/landingpage-image.jpg'} />
          </div>
          <div className='flex justify-center items-center w-full lg:w-1/2 rounded-lg border border-secondary'>
            <div className='flex flex-col items-center justify-center max-w-md p-6 lg:p-4 space-y-20 lg:space-y-0'>
              <h1 className='block lg:hidden font-semibold text-4xl'>
                Progenda
              </h1>
              <div className='flex flex-col text-center md:text-start space-y-4'>
                <h2 className='lg:text-2xl xl:text-4xl font-semibold'>
                  Productive Mind
                </h2>
                <p className='xl:text-2xl'>
                  With only features you need, Progenda is customized for
                  individuals seeking stress-free way to stay focused on their
                  goals, projects and tasks.
                </p>
                <StyledLink
                  src={'/signin'}
                  fullWidth
                  primary>
                  Get Started
                </StyledLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
