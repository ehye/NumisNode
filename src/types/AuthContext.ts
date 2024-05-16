import { type JwtPayload } from 'jsonwebtoken'

export interface CustomJwtPayload extends JwtPayload {
  id: string
  username: string
  name: string
  iat: number
}

export interface AuthContext {
  currentUser: CustomJwtPayload | null
}