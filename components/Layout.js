import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#2B004A] text-white">
      <Head>
        <title>Tarot Insights</title>
        <meta name="description" content="Get your personalized tarot reading" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-[#200038] backdrop-blur-sm py-4 border-b border-gold/20">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-mystical text-gold">
            Tarot Insights
          </Link>
          <div className="flex space-x-6">
            <Link href="/dashboard" className="text-white hover:text-gold transition-colors">
              Dashboard
            </Link>
            <Link href="/reading" className="text-white hover:text-gold transition-colors">
              Reading
            </Link>
            <Link href="/history" className="text-white hover:text-gold transition-colors">
              History
            </Link>
            <Link href="/tokens" className="text-white hover:text-gold transition-colors">
              Tokens
            </Link>
            <button className="text-white hover:text-gold transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 md:py-16">
        {children}
      </main>

      <footer className="bg-[#200038] backdrop-blur-sm py-4 mt-8 border-t border-gold/20">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Tarot Insights. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 