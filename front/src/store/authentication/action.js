import { requests } from '../utils'

import { LOGOUT } from './types'

export const logout = () =>
  requests.action('post', 'logout', {}, {}, {}, LOGOUT)
