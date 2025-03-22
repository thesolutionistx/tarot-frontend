// This is a wrapper component to handle client-side only code
import React from 'react';
import dynamic from 'next/dynamic';

// Import the actual component with no SSR
const ReadingFormNoSSR = dynamic(() => import('../ReadingForm'), {
  ssr: false
});

export default function ReadingPage() {
  return <ReadingFormNoSSR />;
}
