import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

const tokenPackages = [
  {
    id: 'basic',
    name: 'Basic Package',
    tokens: 10,
    price: 4.99,
    description: 'Perfect for beginners starting their mystical journey.',
    features: [
      'Access to single card readings',
      'Past-Present-Future spreads',
      'Basic interpretation guide'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Package',
    tokens: 25,
    price: 9.99,
    description: 'Most popular choice for regular seekers.',
    features: [
      'All basic features',
      'Celtic Cross spreads',
      'Detailed card meanings',
      'Save readings history'
    ]
  },
  {
    id: 'mystic',
    name: 'Mystic Package',
    tokens: 60,
    price: 19.99,
    description: 'For dedicated spiritual explorers.',
    features: [
      'All premium features',
      'Advanced spread layouts',
      'Priority support',
      'Exclusive monthly bonus tokens'
    ]
  }
];

export default function Tokens() {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handlePurchase = (packageId) => {
    setSelectedPackage(packageId);
    // Here you would integrate with your payment processing system
    alert('Payment processing would be integrated here');
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-mystical text-gold mb-4">Token Store</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Purchase tokens to unlock deeper insights and more complex spreads in your tarot journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tokenPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`card-panel relative ${
                pkg.id === 'premium' ? 'border-2 border-gold' : ''
              }`}
            >
              {pkg.id === 'premium' && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gold text-purple-dark px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h2 className="text-2xl font-mystical text-gold mb-2">{pkg.name}</h2>
                <div className="text-3xl font-bold text-white mb-2">
                  ${pkg.price}
                </div>
                <div className="text-gray-300">
                  {pkg.tokens} Tokens
                </div>
              </div>

              <p className="text-gray-300 text-center mb-6">
                {pkg.description}
              </p>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <span className="text-gold mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePurchase(pkg.id)}
                className={`w-full ${
                  pkg.id === 'premium'
                    ? 'btn-primary'
                    : 'btn-outline'
                }`}
              >
                Purchase Package
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 p-6 card-panel"
        >
          <h3 className="text-xl font-mystical text-gold mb-4">
            Custom Token Packages
          </h3>
          <p className="text-gray-300">
            Need a different amount of tokens? Contact us for custom packages tailored to your needs.
          </p>
          <button className="btn-outline mt-4">
            Contact Support
          </button>
        </motion.div>
      </div>
    </Layout>
  );
} 