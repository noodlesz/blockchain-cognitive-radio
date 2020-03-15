import { requests } from '../utils'

import {
    LIST_AVAILABLE_CHANNELS,
    ALLOCATE_CHANNEL
} from './types'

export const allocateChannel = (data, headers = {}) =>
  requests.create('allocate-list', headers, data, ALLOCATE_CHANNEL)