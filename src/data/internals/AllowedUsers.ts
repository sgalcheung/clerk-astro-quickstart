import type { NonMultilingual } from './NonMultilingualT'

export interface AllowedUser {
  allowedUsers: NonMultilingual<Array<User>>
}

interface User {
  userId: string
}
