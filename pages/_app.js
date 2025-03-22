// This is a wrapper component to handle client-side only code
import React from 'react';
import dynamic from 'next/dynamic';
import '../styles/globals.css';

// Import the actual component with no SSR
const AppWrapper = dynamic(() => import('../AppWrapper'), {
  ssr: false
});

function MyApp({ Component, pageProps }) {
  return <AppWrapper Component={Component} pageProps={pageProps} />;
}

export default MyApp;
