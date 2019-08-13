import Vue from 'vue';
const filters = {
  dateFormat(val) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay();
    const dealDate = new Date(val);
    if (day === dealDate.getDay()) {
      return `${dealDate.getHours()}:${dealDate.getMinutes()}`;
    } else {
      return `${dealDate.getMonth() + 1}/${dealDate.getDay()}`;
    }
  },
  urlPatten(val) {
    return `http://10.45.208.141:3000/${val}`;
  }
};

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));


