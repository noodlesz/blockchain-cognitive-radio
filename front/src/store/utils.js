import axios from 'axios'

const DEFAULT_FILTERS = {
  format: 'json'
}
export const DEFAULT_HEADERS = {
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken'
}
export const dj_urls = window.dj_urls
const queryString = require('query-string')


export const requests = {

  get(url, type) {
    return dispatch => axios
      .get(url, DEFAULT_FILTERS)
      .then(response => {
        dispatch({
          type: type,
          payload: response.data
        })
        return response
      })
      .catch(error => {
        throw error
      })
  },

  post(url, headers, data, type) {
    return dispatch => axios
      .post(url, data, { ...DEFAULT_HEADERS, headers })
      .then(response => {
        dispatch({
          type: type,
          payload: response.data
        })
        return response
      })
      .catch(error => {
        throw error
      })
  },

  put(url, headers, data, type) {
    return dispatch => axios
      .put(url, data, { ...DEFAULT_HEADERS, headers })
      .then(response => {
        dispatch({
          type: type,
          payload: response.data
        })
        return response
      })
      .catch(error => {
        throw error
      })
  },

  patch(url, headers, data, type) {
    return dispatch => axios
      .patch(url, data, { ...DEFAULT_HEADERS, headers })
      .then(response => {
        dispatch({
          type: type,
          payload: response.data
        })
        return response
      })
      .catch(error => {
        throw error
      })
  },

  detail(url, params={}, type) {
    url = dj_urls[url](params)
    return this.get(url, type)
  },

  list(url, params={}, filters, type) {
    url = dj_urls[url](params)
    filters = queryString.stringify({ ...filters, ...DEFAULT_FILTERS })
    return this.get(`${ url }?${ filters }`, type)
  },

  create(url, headers, data, type) {
    url = dj_urls[url]()
    return this.post(url, headers, data, type)
  },

  update(method, url, headers, params={}, data, type) {
    url = dj_urls[url](params)
    switch (method) {
      case 'patch':
        return this.patch(url, headers, data, type)
      case 'put':
        return this.put(url, headers, data, type)
    }
  },

  delete(url, headers, params, type) {
    url = dj_urls[url](params)
    return dispatch => axios
      .delete(url, { ...DEFAULT_HEADERS, headers })
      .then(response => {
        dispatch({
          type: type,
          payload: params
        })
        return response
      })
      .catch(error => {
        throw error
      })
  },

  action(method, url, params, filters, data, type) {
    url = dj_urls[url](params)
    filters = queryString.stringify({ ...filters, ...DEFAULT_FILTERS })
    switch (method) {
      case 'get':
        return this.get(`${ url }?${ filters }`, type)
      case 'post':
        return this.post(url, data, type)
    }
  }
}

export const get_poh_avg_chart = (data) => {
  return {
    categories: _.map(data, ({ value }) => value),
    series: [{
      data: _.map(data, ({ count }) => count)
    }]
  }
}

export const get_poh_count_chart = (data) => {
  return {
    categories: data.categories,
    series: _.values(data.series)
  }
}

export const get_risk_count_chart = (data) => {
  return _.map(data, ({ count, url_new, value }) => {
    return {
      name: value,
      url: url_new,
      y: count
    }
  })
}

export const get_po_history_chart = ({ categories, series }) => {
  const size = categories.length
  const total_data = series[0].data[size - 1]
  const fix_data = series[1].data[size - 1]
  const new_data = series[2].data[size - 1]

  return [{
      color: '#FDD835',
      name: 'Persiste',
      y: total_data - new_data,
    }, {
      color: '#3AAE6d',
      name: 'Corrigido',
      y: fix_data,
    }, {
      color: '#2185D0',
      name: 'Novo',
      y: new_data,
    }]
}