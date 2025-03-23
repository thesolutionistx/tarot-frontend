const requiredEnvVars = [
  'NEXT_PUBLIC_API_URL',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'
];

export function validateEnv() {
  const missingVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingVars.length > 0) {
    console.error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
    return false;
  }

  return true;
}

export function getEnvVar(name) {
  const value = process.env[name];
  if (!value) {
    console.warn(`Environment variable ${name} is not set`);
  }
  return value;
}

export const env = {
  apiUrl: getEnvVar('NEXT_PUBLIC_API_URL'),
  stripeKey: getEnvVar('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'),
  isProduction: process.env.NODE_ENV === 'production'
}; 