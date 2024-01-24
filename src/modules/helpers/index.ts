import crypto from 'crypto'
import { env } from '../../env'

export const authentication = (password: string): string => {
  return crypto.createHmac('sha256', password).update(env.SECRET_KEY).digest('hex')
}

export const generateSessionToken = (): string => {
  return crypto.randomUUID()
}