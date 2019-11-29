"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _filefolder = _interopRequireDefault(require("../middleware/filefolder"));

var _recordController = _interopRequireDefault(require("../controlers/recordController"));

var _tokenVerify = _interopRequireDefault(require("../helper/tokenVerify"));

var _validation = require("../middleware/validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express["default"])();
router["delete"]("/:redflagid", _tokenVerify["default"], _recordController["default"].deleteRedflags);
router.post("/", _tokenVerify["default"], _validation.createRecord, _recordController["default"].AddRecord);
router.get("/red-flags", _recordController["default"].allRedflags);
router.patch("/:redflagid/location", _tokenVerify["default"], _recordController["default"].updateRedflaglocation);
router.patch("/:redflagid/comment", _tokenVerify["default"], _recordController["default"].updateRedflagcomment);
router.get("/:redflagid", _recordController["default"].getSingleRedflag);
var _default = router;
exports["default"] = _default;