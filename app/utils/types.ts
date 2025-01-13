export interface StrapiErrorResponse {
  error?: {
    statusCode: number
    error: string
    message: string
  }
}

export interface StrapiUserResponse {
  id: number
  username: string
  bio: string
  image: {
    id: string
    url: string
    alternativeText: string
  }
}

export interface RootUser {
  jwt: string
  user: User
}

export interface User {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
}
