"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "server/uploads/");
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

var filefilter = function filefilter(req, res, cb) {
  if (file.mimetype.includes("image") || file.mimetype.includes("video")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = (0, _multer["default"])({
  storage: storage,
  fileFilter: filefilter
});
var _default = upload;
exports["default"] = _default;
//# sourceMappingURL=filefolder.js.map