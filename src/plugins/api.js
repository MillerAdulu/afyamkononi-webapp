import axios from 'axios'
import identity from 'lodash/identity'

const defaultTransformResponse = response => response.data
const defaultOnError = () => null
class Requester {
  constructor(params = {}) {
    const {
      transformRequestData,
      transformResponse,
      injectHeaders,
      onError,
      ...config
    } = params

    this.onError = onError || defaultOnError

    this._root = axios.create(config)

    this._injectHeaders = injectHeaders || identity
    this._transformRequestData = transformRequestData || identity
    this._transformResponse = transformResponse || defaultTransformResponse
  }

  post(url, payload) {
    return this._request('post', url, {
      data: this._data(payload)
    })
  }

  patch(url, payload) {
    return this._request('patch', url, {
      data: this._data(payload)
    })
  }

  get(url, payload) {
    return this._request('get', url, {
      params: payload
    })
  }

  _request(method, url, data) {
    return this._root.request({
      method,
      url,
      ...data,
      headers: this._injectHeaders(),
    }).then(response => {
      let successObject

      try {
        successObject = this._transformResponse(response)
      } catch (e) {
        successObject = defaultTransformResponse(response)
      }

      return successObject
    }).catch(({
      response
    }) => {
      try {
        this.onError(response.data)
      } catch (error) {
        console.error(error)
      }

      const errorObject = response.data

      return Promise.reject(errorObject)
    })
  }

  _data(payload) {
    return this._transformRequestData(payload)
  }
}


export default new Requester({
  baseURL: 'https://afyamkononi.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json'
  },
  injectHeaders: () => ({
    'Authorization': `Bearer ${ localStorage.getItem('token') }`
  }),
  transformResponse: response => response.data,
  transformRequestData: data => data,
  onError: err => {
    console.log(err)
  },
})