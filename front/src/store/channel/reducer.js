import {
    FETCH_CHANNELS
} from './types'

const state_default = {
    count: 0,
    first: 1,
    has_next: null,
    has_prev: null,
    last: "last",
    next: null,
    num_pages: 0,
    page_number: 1,
    previous: null,
    results: []
}

export default (state = state_default, action) => {
    switch (action.type) {
      case FETCH_CHANNELS:
        return {
            ...action.payload,
            results: _.mapKeys(action.payload.results, "id")
        }
      default:
        return state;
    }
  }