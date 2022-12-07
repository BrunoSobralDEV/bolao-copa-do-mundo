import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://192.168.0.8:3333',
  // baseURL: 'http://192.168.0.112:3333',
})