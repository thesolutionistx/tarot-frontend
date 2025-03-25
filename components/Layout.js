import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen relative">
      <Head>
        <title>Tarot Insights</title>
        <meta name="description" content="Get your personalized tarot reading" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-purple-darker/80 backdrop-blur-md border-b border-gold/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl">✨</div>
              <span className="text-2xl font-mystical text-gold">Tarot Insights</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link href="/reading" className="nav-link">
                Reading
              </Link>
              <Link href="/history" className="nav-link">
                History
              </Link>
              <Link href="/tokens" className="nav-link">
                Tokens
              </Link>
              <button className="nav-link">
                Sign Out
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white hover:text-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-purple-darker/95 backdrop-blur-md border-b border-gold/20"
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                <Link href="/dashboard" className="block nav-link py-2">
                  Dashboard
                </Link>
                <Link href="/reading" className="block nav-link py-2">
                  Reading
                </Link>
                <Link href="/history" className="block nav-link py-2">
                  History
                </Link>
                <Link href="/tokens" className="block nav-link py-2">
                  Tokens
                </Link>
                <button className="block nav-link py-2 w-full text-left">
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>

      <footer className="bg-purple-darker/80 backdrop-blur-md border-t border-gold/20 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-mystical text-gold mb-4">Tarot Insights</h3>
              <p className="text-gray-400">
                Discover your destiny through the ancient wisdom of the cards.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-mystical text-gold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/reading" className="text-gray-400 hover:text-gold transition-colors">
                    Get a Reading
                  </Link>
                </li>
                <li>
                  <Link href="/history" className="text-gray-400 hover:text-gold transition-colors">
                    Reading History
                  </Link>
                </li>
                <li>
                  <Link href="/tokens" className="text-gray-400 hover:text-gold transition-colors">
                    Token Store
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-mystical text-gold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.09 1.064.077 1.791.232 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.233.636.388 1.363.465 2.427.077 1.067.09 1.407.09 4.123v.08c0 2.643-.012 2.987-.09 4.043-.077 1.064-.232 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.233-1.363.388-2.427.465-1.067.077-1.407.09-4.123.09h-.08c-2.643 0-2.987-.012-4.043-.09-1.064-.077-1.791-.232-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.233-.636-.388-1.363-.465-2.427-.047-1.024-.09-1.379-.09-3.808v-.63c0-2.43.013-2.784.09-3.808.077-1.064.232-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.233 1.363-.388 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gold/10 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Tarot Insights. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 