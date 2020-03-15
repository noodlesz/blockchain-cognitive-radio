import { requests } from '../utils'

import {
    LEASE_CHANNEL,
} from './types'

export const leaseChannel = (data, headers = {}) =>
  requests.create('lease-list', headers, data, LEASE_CHANNEL)
