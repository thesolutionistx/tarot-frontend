import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#2B004A] text-white">
      <Head>
        <title>Tarot Insights</title>
        <meta name="description" content="Get your personalized tarot reading" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-[#200038] backdrop-blur-sm py-4 border-b border-gold/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-mystical text-gold">
              Tarot Insights
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-gold transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Desktop navigation */}
            <div className="hidden md:flex space-x-6">
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

          {/* Mobile navigation */}
          <motion.div
            initial={false}
            animate={{ height: isMenuOpen ? 'auto' : 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="py-4 space-y-4">
              <Link href="/dashboard" className="block text-white hover:text-gold transition-colors">
                Dashboard
              </Link>
              <Link href="/reading" className="block text-white hover:text-gold transition-colors">
                Reading
              </Link>
              <Link href="/history" className="block text-white hover:text-gold transition-colors">
                History
              </Link>
              <Link href="/tokens" className="block text-white hover:text-gold transition-colors">
                Tokens
              </Link>
              <button className="block text-white hover:text-gold transition-colors">
                Sign Out
              </button>
            </div>
          </motion.div>
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