'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { isIResponseError } from '@/types/IResponseError';

const SignupPage = () => {
  const router = useRouter();
  const session = useSession();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session.status === 'authenticated') router.push('/');
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) throw await res.json();

      router.push('/account/login');
      setLoading(false);
    } catch (error) {
      if (isIResponseError(error)) {
        setNameError('');
        setEmailError('');
        setPasswordError('');

        error.errors.forEach((err) => {
          if (err.path?.includes('name')) {
            setNameError(err.message);
          } else if (err.path?.includes('email')) {
            setEmailError(err.message);
          } else if (err.path?.includes('password')) {
            setPasswordError(err.message);
          }
        });
      } else {
        console.error(error);
      }

      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full form-control justify-center"
    >
      <h1 className="mb-5 text-3xl text-center">Create an account</h1>

      <label htmlFor="name" className="label">
        Name
      </label>
      <input
        id="name"
        type="text"
        className="input input-bordered"
        onChange={(e) => setName(e.target.value)}
      />
      {nameError && <p className="mt-1 text-xs text-error">{nameError}</p>}

      <label htmlFor="email" className="mt-3 label">
        Email
      </label>
      <input
        id="email"
        type="text"
        className="input input-bordered"
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailError && <p className="mt-1 text-xs text-error">{emailError}</p>}

      <label htmlFor="password" className="mt-3 label">
        Password
      </label>
      <input
        id="password"
        type="password"
        className=" input input-bordered"
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordError && (
        <p className="mt-1 text-xs text-error">{passwordError}</p>
      )}

      <button className="mt-3 mb-5 btn btn-primary">
        {loading ? (
          <>
            <span className="loading loading-spinner"></span>
            Signing up...
          </>
        ) : (
          'Sign up'
        )}
      </button>

      <p className="text-center">
        Already have an account?{' '}
        <Link href="/account/login" className="link link-primary">
          Log In
        </Link>
      </p>
    </form>
  );
};

export default SignupPage;
