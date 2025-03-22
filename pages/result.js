// This is a wrapper component to handle client-side only code
import React from 'react';
import dynamic from 'next/dynamic';

// Import the actual component with no SSR
const ReadingResultNoSSR = dynamic(() => import('../ReadingResult'), {
  ssr: false
});

export default function ResultPage() {
  return <ReadingResultNoSSR />;
}
