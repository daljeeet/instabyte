import { expireUserCookie } from '../../../lib/auth'
import { jsonResponse } from '../../../lib/utils'
export const config = {
  runtime: 'edge',
}
export default async function auth(req) {
  if (req.method !== 'POST') {
    return jsonResponse(405, { error: { message: 'Method not allowed' } })
  }
  try {
   return await expireUserCookie(jsonResponse(200, {success:true }))
  } catch (err) {
    return jsonResponse(500, { error: { message: 'Authentication failed.' } })
  }
}