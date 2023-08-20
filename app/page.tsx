import Link from 'next/link';
import MainNavbar from '@/components/MainNavbar';

const page = () => {
  return (
    <>
      <MainNavbar />

      <div className="container mx-auto px-3 max-w-screen-xl">
        <main className="mx-auto max-w-screen-md py-16 flex flex-col items-center text-center">
          <h1 className="mb-6 text-6xl font-bold primary-content">
            Organize your work and life with TaskHub.
          </h1>
          <p className="mb-6 mx-auto max-w-screen-sm text-lg">
            An open source project that provides a powerful task management
            solution for individuals and teams.
          </p>

          <Link href="/account/signup" className="btn btn-primary">
            Get Started
          </Link>
        </main>
      </div>
    </>
  );
};

export default page;
