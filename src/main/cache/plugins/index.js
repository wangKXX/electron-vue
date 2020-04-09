const fs = require('fs');
module.exports = {
  checkFile(path) {
    let isExist = fs.existsSync(path);
      if (!isExist) {
        fs.mkdirSync(path);
      }
  }
}