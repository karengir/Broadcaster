"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _record = _interopRequireDefault(require("../models/record"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var recordController =
/*#__PURE__*/
function () {
  function recordController() {
    _classCallCheck(this, recordController);
  }

  _createClass(recordController, null, [{
    key: "AddRecord",
    value: function AddRecord(req, res) {
      var userId = req.user.id;
      var record = {
        id: _record["default"].length + 1,
        createdOn: (0, _moment["default"])().format("MMMM Do YYYY, h:mm:ss a"),
        createdBy: userId,
        title: req.body.title,
        type: req.body.type,
        comment: req.body.comment,
        location: req.body.location,
        status: req.body.status // images : req.image.images,
        // videos : req.body.videos,

      };

      _record["default"].push(record);

      res.status(201).json({
        status: 201,
        message: "record created successfully",
        data: {
          id: record.id,
          createdBy: record.createdBy
        }
      });
    }
  }, {
    key: "allRedflags",
    value: function allRedflags(req, res) {
      res.status(200).json({
        status: 200,
        data: _record["default"]
      });
    }
  }, {
    key: "getSingleRedflag",
    value: function getSingleRedflag(req, res) {
      var id = parseInt(req.params.redflagid);

      var flag = _record["default"].find(function (rec) {
        return rec.id === id;
      });

      if (flag) {
        res.status(200).json({
          status: 200,
          data: flag
        });
      }

      return res.status(404).json({
        status: 404,
        message: "Record not found"
      });
    }
  }, {
    key: "deleteRedflags",
    value: function deleteRedflags(req, res) {
      var id = parseInt(req.params.redflagid, 10);

      var flag = _record["default"].find(function (rec) {
        return rec.id === id;
      });

      if (flag) {
        if (flag.createdBy === req.user.id) {
          _record["default"].splice(_record["default"].indexOf(flag), 1);

          return res.status(200).json({
            status: 200,
            data: {
              id: flag.id,
              message: "red-flag record has been deleted"
            }
          });
        }

        return res.status(400).json({
          status: 400,
          error: "cannot delete record you did not create"
        });
      }

      return res.status(404).json({
        status: 404,
        error: "No record found"
      });
    }
  }, {
    key: "updateRedflaglocation",
    value: function updateRedflaglocation(req, res) {
      var id = parseInt(req.params.redflagid, 10);

      var flag = _record["default"].find(function (rec) {
        return rec.id === id;
      });

      var userId = req.user.id;

      if (flag) {
        if (flag.createdBy === userId) {
          var i = _record["default"].findIndex(function (el) {
            return el.id === flag.id;
          });

          _record["default"][i].location = req.body.location;
          return res.status(200).json({
            status: 200,
            message: "Updated red-flag record’s location",
            data: {
              id: flag.id
            }
          });
        }

        return res.status(400).json({
          status: 400,
          message: "you cannot edit a record that you did not create"
        });
      }

      return res.status(404).json({
        status: 404,
        message: "Record not found"
      });
    }
  }, {
    key: "updateRedflagcomment",
    value: function updateRedflagcomment(req, res) {
      var id = parseInt(req.params.redflagid, 10);

      var flag = _record["default"].find(function (rec) {
        return rec.id == id;
      });

      if (flag) {
        if (flag.createdBy == req.user.id) {
          var i = _record["default"].findIndex(function (el) {
            return el.id === flag.id;
          });

          _record["default"][i].comment = req.body.comment;
          return res.status(200).json({
            status: 200,
            data: {
              id: flag.id,
              message: 'Updated red-flag record’s comment'
            }
          });
        }

        return res.status(400).json({
          status: 400,
          message: 'you cannot edit a record that you did not create'
        });
      }

      return res.status(404).json({
        status: 404,
        message: 'Record not found not found'
      });
    }
  }]);

  return recordController;
}();

var _default = recordController;
exports["default"] = _default;