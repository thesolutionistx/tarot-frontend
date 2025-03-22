// This is a wrapper component to handle client-side only code
import React from 'react';
import dynamic from 'next/dynamic';

// Import the actual component with no SSR
const RegisterNoSSR = dynamic(() => import('../Register'), {
  ssr: false
});

export default function RegisterPage() {
  return <RegisterNoSSR />;
}
