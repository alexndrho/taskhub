'use client';
import { useSession } from 'next-auth/react';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';

const App = () => {
  const { data: session } = useSession();

  if (session) {
    return <HomePage />;
  }

  return <LandingPage />;
};

export default App;
