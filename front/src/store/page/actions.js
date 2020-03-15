import { requests } from '../utils'

import {
  CREATE_PAGE,
  DUPLICATE_PAGE,
  UPDATE_PAGE,
  FETCH_PAGE,
  FETCH_PAGES,
  FETCH_PAGE_HISTORY,
  FETCH_PAGE_BREADCRUMB
} from './types'

export const createPage = (data, headers = {}) =>
  requests.create('page-list', headers, data, CREATE_PAGE)

export const duplicatePage = (data, headers = {}) =>
  requests.create('page-duplicate', headers, data, DUPLICATE_PAGE)

export const updatePage = (slug, data = {}, headers = {}) =>
  requests.update('put', 'page-detail', headers, { slug }, data, UPDATE_PAGE)

export const fetchPage = slug =>
  requests.detail('page-detail', { slug }, FETCH_PAGE)

export const fetchPages = (filters = {}) =>
  requests.list('page-list', {}, filters, FETCH_PAGES)

export const fetchPageHistory = (filters = {}) =>
  requests.list('page-history', {}, filters, FETCH_PAGE_HISTORY)

export const fetchPageBreadcrumb = slug =>
  requests.detail('page-get-breadcrumb', { slug }, FETCH_PAGE_BREADCRUMB)