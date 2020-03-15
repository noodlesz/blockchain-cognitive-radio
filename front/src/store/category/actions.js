import { requests } from '../utils'

import {
  CREATE_GATEGORY,
  UPDATE_CATEGORY,
  FETCH_CATEGORY,
  FETCH_CATEGORY_BY_ID,
  FETCH_CATEGORIES,
  FETCH_CATEGORY_PAGES,
  FETCH_CATEGORY_MOST_USED
} from './types'

export const createCategory = (data, headers = {}) =>
  requests.create("category-list", headers, data, CREATE_GATEGORY)

export const updateCategory = (slug, data = {}, headers = {}) =>
  requests.update("put", "category-detail", headers, { slug }, data, UPDATE_CATEGORY)

export const fetchCategory = slug =>
  requests.detail("category-detail", { slug }, FETCH_CATEGORY)

export const fetchCategoryById = (filters = {}) =>
  requests.list("category-get-category-by-id", {}, filters, FETCH_CATEGORY_BY_ID)

export const fetchCategories = (filters = {}) =>
  requests.list("category-list", {}, filters, FETCH_CATEGORIES)

export const fetchCategoryPages = (filters = {}) =>
  requests.list("category-get-pages", {}, filters, FETCH_CATEGORY_PAGES)

export const fetchCategoryMostUsed = (filters = {}) =>
  requests.list("category-get-most-used", {}, filters, FETCH_CATEGORY_MOST_USED)