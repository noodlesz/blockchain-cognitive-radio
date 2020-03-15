import LEASE_CHANNEL from './types'

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
      case LEASE_CHANNEL:
        return {
          ...state,
          results: {
            ...state.results, [action.payload.slug]: action.payload }
        }
      default:
        return state;
    }
  }