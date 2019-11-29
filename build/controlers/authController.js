"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _users = _interopRequireDefault(require("../models/users"));

var _tokenGen = _interopRequireDefault(require("../helper/tokenGen"));

var _passwordHash = require("../helper/passwordHash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var authController =
/*#__PURE__*/
function () {
  function authController() {
    _classCallCheck(this, authController);
  }

  _createClass(authController, null, [{
    key: "signup",
    value: function signup(req, res) {
      // const salt = bcrypt.genSaltSync(10);
      // const passwordEncr = bcrypt.hashSync(req.body.password, salt);
      var passwordEncry = (0, _passwordHash.passwordhash)(req.body.password);
      var user = {
        id: _users["default"].length + 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        username: req.body.username,
        password: passwordEncry
      };

      var found = _users["default"].find(function (u) {
        return u.email === user.email;
      });

      if (!found) {
        _users["default"].push(user);

        res.status(201).json({
          status: 201,
          message: "User successfully created",
          data: user,
          token: (0, _tokenGen["default"])(user.email, user.id)
        });
      } else {
        return res.status(409).json({
          status: 409,
          message: "user already exists"
        });
      }
    }
  }, {
    key: "signin",
    value: function signin(req, res) {
      var user = {
        email: req.body.email,
        password: req.body.password
      };

      var found = _users["default"].find(function (u) {
        return u.email === user.email;
      });

      if (found) {
        var compare = (0, _passwordHash.passwordVerify)(user.password, found.password);

        if (compare) {
          var tokn = (0, _tokenGen["default"])(user.email, user.id);
          return res.status(200).json({
            status: 200,
            token: tokn,
            message: "User successfully logged in"
          });
        } else {
          return res.status(401).json({
            status: 401,
            error: "Password or email is incorrect"
          });
        }
      }

      return res.status(404).json({
        status: 404,
        error: "Password or email is incorrect"
      });
    }
  }]);

  return authController;
}();

var _default = authController;
exports["default"] = _default;