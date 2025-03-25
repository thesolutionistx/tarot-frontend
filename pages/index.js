import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      <Head>
        <title>Tarot Card Reader</title>
        <meta name="description" content="Get your personalized tarot reading" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
          Welcome to Your Tarot Journey
        </h1>
        
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xl mb-8">
            Discover insights about your past, present, and future through the ancient wisdom of tarot cards.
          </p>
          
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
            Start Your Reading
          </button>
        </div>
      </main>
    </div>
  );
} 