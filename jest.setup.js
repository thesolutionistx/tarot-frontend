// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock environment variables for testing
process.env.NEXT_PUBLIC_API_URL = 'http://test-api.example.com'
process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = 'pk_test_123'

// Mock fetch globally
global.fetch = jest.fn()

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks()
}) 