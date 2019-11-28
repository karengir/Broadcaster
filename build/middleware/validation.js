"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRecord = exports.signIn = exports.signUp = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var signUp = function signUp(req, res, next) {
  var fields = _joi["default"].object({
    firstname: _joi["default"].string().strict().trim().required(),
    lastname: _joi["default"].string().strict().trim().required(),
    email: _joi["default"].string().strict().trim().required().email(),
    phoneNumber: _joi["default"].string().strict().trim().required(),
    username: _joi["default"].string().strict().trim().required(),
    password: _joi["default"].string().strict().trim().required()
  });

  var output = fields.validate(req.body);

  if (output.error != null) {
    return res.status(400).json({
      status: 400,
      error: "".concat(output.error.details[0].message)
    });
  }

  next();
};

exports.signUp = signUp;

var signIn = function signIn(req, res, next) {
  var fields = _joi["default"].object({
    email: _joi["default"].string().strict().trim().required().email(),
    password: _joi["default"].string().strict().trim().required().min(5)
  });

  var output = fields.validate(req.body);

  if (output.error != null) {
    return res.status(400).json({
      status: 400,
      error: "".concat(output.error.details[0].message)
    });
  }

  next();
};

exports.signIn = signIn;

var createRecord = function createRecord(req, res, next) {
  var fields = _joi["default"].object({
    title: _joi["default"].string().strict().trim().required(),
    type: _joi["default"].string().strict().trim().required(),
    location: _joi["default"].string().strict().trim().required(),
    status: _joi["default"].string().strict().trim().required(),
    comment: _joi["default"].string().strict().trim().required()
  });

  var output = fields.validate(req.body);

  if (output.error != null) {
    return res.status(400).json({
      status: 400,
      error: "".concat(output.error.details[0].message)
    });
  }

  next();
};

exports.createRecord = createRecord;
//# sourceMappingURL=validation.js.map