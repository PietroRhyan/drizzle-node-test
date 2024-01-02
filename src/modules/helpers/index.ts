import crypto from 'crypto'

export const authentication = (password: string): string => {
  return crypto.createHmac('sha256', password).update(process.env.SECRET_KEY!).digest('hex')
}