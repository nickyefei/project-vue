
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
axios.interceptors.response.use((res) => {
  return res.data;
})

export const getInfo = () => {
  return axios.get('/info')
}
export const getList = () => {
  return axios.get('/list')
}
export const delItem = (id) => {
  return axios.delete(`/list?id=${id}`)
}
export const getDetail = (id) => {
  return axios.get(`/list?id=${id}`)
}
export const updatePerson = (id, data) => {
  return axios.put(`/list?id=${id}`,data)
}
export const getPage = (page) => {
  return axios.get(`/page?page=${page}`)
}