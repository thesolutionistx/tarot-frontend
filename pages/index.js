import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Landing from '../Landing';
import Dashboard from '../Dashboard';
import { useSelector } from 'react-redux';

export default function Home() {
  const router = useRouter();
  const isAuthenticated = useSelector(state => state.auth?.isAuthenticated);
  
  useEffect(() => {
    // Check if user is authenticated from localStorage on initial load
    const token = localStorage.getItem('token');
    if (!isAuthenticated && token) {
      // If token exists but not authenticated in Redux, redirect to dashboard
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? <Dashboard /> : <Landing />;
}
