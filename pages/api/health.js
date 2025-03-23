export default async function handler(req, res) {
  try {
    // Check API connection
    const apiResponse = await fetch(process.env.NEXT_PUBLIC_API_URL);
    const apiStatus = apiResponse.ok ? 'healthy' : 'unhealthy';

    // Check Stripe connection
    const stripeStatus = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'healthy' : 'unhealthy';

    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        api: apiStatus,
        stripe: stripeStatus
      },
      environment: process.env.NODE_ENV
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
} 