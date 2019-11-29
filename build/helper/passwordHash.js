"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordVerify = exports.passwordhash = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var passwordhash = function passwordhash(password) {
  return _bcryptjs["default"].hashSync(password, _bcryptjs["default"].genSaltSync(10));
};

exports.passwordhash = passwordhash;

var passwordVerify = function passwordVerify(userPassword, foundPassword) {
  return _bcryptjs["default"].compareSync(userPassword, foundPassword);
};

exports.passwordVerify = passwordVerify;