/**
 * 404 Middleware
 * Purpose: Handle 404's in a consistent way
 */
export default function notFoundMiddleware(_req, res) {
  return res.status(404).send({ error: { message: 'NOT_FOUND' } })
}