import { createMocks } from 'node-mocks-http'
import handler from '../../pages/api/health'

describe('Health Check API', () => {
  it('should return healthy status when all services are up', async () => {
    // Mock fetch for API check
    global.fetch = jest.fn().mockResolvedValue({ ok: true })

    const { req, res } = createMocks({
      method: 'GET',
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.status).toBe('healthy')
    expect(data.services.api).toBe('healthy')
    expect(data.services.stripe).toBe('healthy')
  })

  it('should return unhealthy status when API is down', async () => {
    // Mock fetch for API check
    global.fetch = jest.fn().mockResolvedValue({ ok: false })

    const { req, res } = createMocks({
      method: 'GET',
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.status).toBe('healthy')
    expect(data.services.api).toBe('unhealthy')
    expect(data.services.stripe).toBe('healthy')
  })
}) 