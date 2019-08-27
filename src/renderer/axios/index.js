import axios from 'axios';
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
function getInstance() {
  const instance = axios.create();
  instance.interceptors.request.use(config => {
    config.baseURL = `http://${window.IP}:3000`;
    config.timeout = 5000;
    config.cancelToken = source.token;
    return config;
  },error => {
    console.error(`request error: ${error.message}`);
  });
  instance.interceptors.response.use(response => {
    return response;
  }, error => {
    return Promise.reject(error);
  });
  return instance
}
const instance = getInstance();

function getLogin(params) {
  return instance.post('/userLogin', {
    params
  });
}
function register(params) {
  console.log(params.get('id'))
  return instance.post('/register', params, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

function getUserList(id) {
  return instance.post('/getUserList', {
    id
  });
}

function getUserById(id) {
  return instance.post('/getUserById', {
    id
  })
}
export default {
  getLogin,
  register,
  getUserList,
  getUserById
}