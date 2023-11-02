'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { AiOutlineGoogle, AiOutlineGithub } from 'react-icons/ai';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import StyledButton from './buttons/StyledButton';
import clsx from 'clsx';
import axios from 'axios';

const SingInForm = () => {
  const [variant, setVariant] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: '', email: '', password: '' },
  });
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/users/');
    }
  }, [session?.status, session.data?.user?.name, router]);

  const toggleVariant = () => {
    if (variant === 'LOGIN') setVariant('REGISTER');
    else setVariant('LOGIN');
  };

  const onSubmit: SubmitHandler<FieldValues> = (credentials) => {
    setIsLoading(true);

    if (variant === 'LOGIN') {
      signIn('credentials', { ...credentials, redirect: false })
        .then((callback) => {
          if (callback?.error) toast.error('invalid credentials');
          if (!callback?.error && callback?.ok) {
            toast.success('Logged in!');
            router.push(`/users/}`);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    if (variant === 'REGISTER') {
      axios
        .post('/api/register', credentials)
        .then(() => {
          toast.success('Succes!');
          signIn('credentials', credentials);
        })
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => setIsLoading(false));
    }
  };

  const providerSignIn = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Something went wrong!');
        }
        if (!callback?.error && callback?.ok) {
          toast.success('Logged in!');
          router.push('/users/');
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className='w-full flex-col space-y-6'>
      <h2 className='text-3xl font-semibold'>
        {variant === 'LOGIN' ? 'Sign In' : 'Register'}
      </h2>
      <form
        className='flex flex-col space-y-4'
        onSubmit={handleSubmit(onSubmit)}>
        {variant === 'REGISTER' && (
          <input
            type='text'
            placeholder='Name'
            {...register('name', { required: true, disabled: isLoading })}
            className={clsx(
              `
            py-2
            px-2
            border
            outline-none
            rounded-md
            ring-2
            ring-inset
            ring-transparent`,
              isLoading && 'opacity-50 cursor-default',
              errors.name && 'ring-rose-400',
              !errors.name && 'focus-visible:ring-gray-500'
            )}
          />
        )}
        <input
          type='email'
          placeholder='Email'
          {...register('email', { required: true, disabled: isLoading })}
          className={clsx(
            `
          py-2
          px-2
          border
          outline-none
          rounded-md
          ring-2
          ring-inset
          ring-transparent`,
            isLoading && 'opacity-50 cursor-default',
            errors.email && 'ring-rose-400',
            !errors.email && 'focus-visible:ring-gray-500'
          )}
        />
        <input
          type='password'
          placeholder='Password'
          {...register('password', { required: true, disabled: isLoading })}
          className={clsx(
            `
          py-2
          px-2
          border
          outline-none
          rounded-md
          ring-2
          ring-inset
          ring-transparent`,
            isLoading && 'opacity-50 cursor-default',
            errors.password && 'ring-rose-400',
            !errors.password && 'focus-visible:ring-gray-500'
          )}
        />
        <StyledButton
          disabled={isLoading}
          fullWidth
          primary>
          {variant === 'LOGIN' ? 'Sign in' : 'Create account'}
        </StyledButton>
      </form>
      <div className='relative flex justify-center items-center'>
        <div className='w-full h-[1px] xl:h-[2px] bg-gray-400' />
        <span className='absolute z-10 bg-background_LM px-4 text-sm text-gray-500'>
          or sign in with
        </span>
      </div>
      <div className='flex space-x-4'>
        <StyledButton
          func={() => providerSignIn('github')}
          disabled={isLoading}
          fullWidth
          secondary>
          <AiOutlineGithub className='text-lg' />
        </StyledButton>
        <StyledButton
          func={() => providerSignIn('google')}
          disabled={isLoading}
          fullWidth
          secondary>
          <AiOutlineGoogle className='text-lg' />
        </StyledButton>
      </div>
      <button
        type='button'
        disabled={isLoading}
        onClick={toggleVariant}
        className='
        flex
        justify-center
        items-center
        text-gray-500
        text-sm
        mx-auto
        enabled:hover:text-gray-700
        transition-colors'>
        {variant === 'LOGIN'
          ? "Don't have account yet? Register"
          : 'Have account already? Sign in'}
      </button>
    </div>
  );
};

export default SingInForm;
