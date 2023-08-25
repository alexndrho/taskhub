'use client';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const session = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session.status === 'authenticated') router.push(callbackUrl);
  }, [session, router, callbackUrl]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (res?.error) {
        setError('Invalid email or password');
      } else {
        router.push(callbackUrl);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);

      setLoading(false);
    }
  };

  useEffect(() => {
    setError('');
  }, [email, password]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full form-control justify-center"
    >
      <h1 className="mb-5 text-3xl text-center">Log in to your account</h1>

      <label htmlFor="email" className="label">
        Email
      </label>
      <input
        id="email"
        type="text"
        className="mb-3 input input-bordered"
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password" className="label">
        Password
      </label>
      <input
        id="password"
        type="password"
        className="input input-bordered"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="mt-1 text-error text-sm">{error}</p>}

      <button className="mt-3 btn btn-primary">
        {loading ? (
          <>
            <span className="loading loading-spinner"></span>
            Logging in...
          </>
        ) : (
          'Log in'
        )}
      </button>
    </form>
  );
};

export default LoginPage;
