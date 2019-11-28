"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authController = _interopRequireDefault(require("../controlers/authController"));

var _validation = require("../middleware/validation");

var _passwordHash = _interopRequireDefault(require("../helper/passwordHash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express["default"])();
router.post("/signup", _validation.signUp, _authController["default"].signup);
router.post("/signin", _validation.signIn, _authController["default"].signin);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=authRouter.js.map