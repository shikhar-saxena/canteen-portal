const validator = require("validator");

function checkEmpty(val) {
  if (!val || validator.isEmpty(val)) return true;
  else return false;
}

module.exports = checkEmpty;
