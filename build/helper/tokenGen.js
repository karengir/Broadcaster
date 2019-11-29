"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var MakeToken = function MakeToken(email, id) {
  return _jsonwebtoken["default"].sign({
    email: email,
    id: id
  }, process.env.SECRET);
};

var _default = MakeToken;
exports["default"] = _default;