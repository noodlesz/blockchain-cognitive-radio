import { requests } from '../utils'
import {
  CREATE_MENU,
  FETCH_MENU,
  DELETE_MENU
} from './types'

export const createMenu = (data, headers = {}) =>
  requests.create('menu-list', headers, data, CREATE_MENU)

export const fetchMenu = (filters = {}) =>
  requests.list('menu-list-menu', {}, filters, FETCH_MENU)

export const deleteMenu = (slug) =>
  requests.detail('menu-delete', slug, DELETE_MENU)