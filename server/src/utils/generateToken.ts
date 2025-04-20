import jwt from 'jsonwebtoken'

export const generateToken = (user: { id: number; email: string; role: string }): string => {
  const secret = process.env.JWT_SECRET as string
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, { expiresIn: '7d' })
}
