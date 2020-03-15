import { requests } from '../utils'

import {
    FETCH_CHANNELS,
} from './types'

export const fetchChannels = (filters = {}) =>
  requests.list('channel-list', {}, filters, FETCH_CHANNELS)