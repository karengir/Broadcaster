"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _authRouter = _interopRequireDefault(require("./routes/authRouter"));

var _recordRouter = _interopRequireDefault(require("./routes/recordRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable comma-dangle */

/* eslint-disable quotes */

/* eslint-disable linebreak-style */

/* eslint-disable no-undef */

/* eslint-disable no-console */
_dotenv["default"].config();

var app = (0, _express["default"])();
var port = process.env.PORT || 3000;
app.use(_bodyParser["default"].json());
app.use("/api/v1/red-flags", _recordRouter["default"]);
app.use("/api/v1/auth", _authRouter["default"]);
app.get("/", function (req, res) {
  res.status(200).json({
    status: 200,
    message: "Broadcaster project"
  });
});
app.listen(port, function () {
  console.log("server running on port ".concat(port));
});
var _default = app;
exports["default"] = _default;