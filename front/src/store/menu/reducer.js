import {
  CREATE_MENU,
  FETCH_MENU,
  DELETE_MENU
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
};

export default (state = state_default, action) => {
  switch (action.type) {
    case CREATE_MENU:
      return {
        ...state,
        results: {
          ...state.results, [action.payload.slug]: action.payload }
      }
    case FETCH_MENU:
      return {
        ...action.payload,
        results: _.mapKeys(action.payload.results, 'slug')
      }
    case DELETE_MENU:
      return {
        ...state,
        results: _.omit(state.results, action.payload.slug)
      }
    default:
      return state;
  }
}