import {
  CREATE_PAGE,
  DUPLICATE_PAGE,
  UPDATE_PAGE,
  FETCH_PAGE,
  FETCH_PAGES,
  FETCH_PAGE_HISTORY,
  FETCH_PAGE_BREADCRUMB
} from "./types"

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
  slug: '',
  results: []
};

export default (state = state_default, action) => {
  switch (action.type) {
    case CREATE_PAGE:
    case DUPLICATE_PAGE:
    case UPDATE_PAGE:
    case FETCH_PAGE:
      return {
        ...state,
        results: { ...state.results, [action.payload.slug]: action.payload }
      }
    case FETCH_PAGES:
      const pages = action.payload.results
      return {
        ...action.payload,
        results: _.mapKeys(pages, "slug"),
        last: _.map(_.slice(pages, 0, 5), page => page.slug)
      }
    case FETCH_PAGE_BREADCRUMB:
      const slug_breadcrumb = action.payload.slug
      return {
        ...state,
        results: {
          ...state.results,
          [slug_breadcrumb]: {
            ...state.results[slug_breadcrumb],
            breadcrumb: {...action.payload.results}
          }
        }
      }
    case FETCH_PAGE_HISTORY:
      const { slug } = action.payload.results

      return {
        ...state,
        ...action.payload,
        slug: action.payload.results.slug,
        results: {
          ...state.results,
          [slug]: {
            ...state.results[slug],
            versions: _.mapKeys(action.payload.results.pages, 'slug')
          }
        }
      }
    default:
      return state;
  }
}
