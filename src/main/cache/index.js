const lndb = require('lndb');
const fileUtils = require('./plugins');
const _path = require('path');
function cache(userID) {
  fileUtils.checkFile(_path.resolve(__dirname, `../../../myAppCache/${userID}`));
  this.db = new lndb(_path.resolve(__dirname, `../../../myAppCache/${userID}`));
  this.cache = this.db.init('cache');
}

cache.prototype.setCache = function(key, cacheObj, isNeedRest = false) { // 累加缓存
  let data = this.getCacheByKey(key);
  if (Array.isArray(data)) {
    const res = data.some(item => {
      return item.id === cacheObj.id;
    })
    if (!res) {
      data.push(cacheObj);
    }
    if(key !== 'userList'){
      data.push(cacheObj);
    }
  } else {
    data = [];
    data.push(cacheObj);
  }
  this.cache.set(key, data);
};

cache.prototype.getCacheByKey = function(key) {
  return this.cache.get(key).data;
}

cache.prototype.removeCacheBykey = function(key) {
  this.cache.remove(key);
}

cache.prototype.clear = function() {
  this.cache.clear();
}

module.exports = cache;