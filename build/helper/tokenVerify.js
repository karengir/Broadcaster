"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var tokenVerify = function tokenVerify(req, res, next) {
  try {
    var token = req.header("token");

    var valid = _jsonwebtoken["default"].verify(token, process.env.SECRET);

    req.user = valid;
    next();
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "invalid token"
    });
  }
};

var _default = tokenVerify;
exports["default"] = _default;
//# sourceMappingURL=tokenVerify.js.map