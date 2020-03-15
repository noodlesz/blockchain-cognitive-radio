import {
  CREATE_GATEGORY,
  UPDATE_CATEGORY,
  FETCH_CATEGORY,
  FETCH_CATEGORIES,
  FETCH_CATEGORY_BY_ID,
  FETCH_CATEGORY_PAGES,
  FETCH_CATEGORY_MOST_USED
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
    case CREATE_GATEGORY:
    case UPDATE_CATEGORY:
    case FETCH_CATEGORY:
      return {
        ...state,
        results: { ...state.results, [action.payload.slug]: action.payload }
      }
    case FETCH_CATEGORIES:
    case FETCH_CATEGORY_BY_ID:
    case FETCH_CATEGORY_PAGES:
      let slug = action.payload.results.cat

      // this is called in the list of the pages in a category
      if (!_.isUndefined(slug)) {
        return {
          ...action.payload,
          results: {
            ...state.results,
            [slug]: {
              ...state.results[slug],
              pages: _.mapKeys(action.payload.results.pages, 'slug')
            }
          }
        }
      } else {
        return {
          ...action.payload,
          results: _.mapKeys(action.payload.results, "slug")
        }
      }
    case FETCH_CATEGORY_MOST_USED:
      if (!_.isUndefined(action.payload.results.most_used)) {
        return {
          ...action.payload,
          results: {
            ...state.results,
            MOST_USED: _.mapKeys(action.payload.results.most_used, 'slug')
          }
        }
      }
    default:
      return state;
  }
};