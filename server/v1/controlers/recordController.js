import moment from "moment";
import records from "../models/record";

class recordController {
  static AddRecord(req, res) {
    const userId = req.user.id;
    const record = {
      id: records.length + 1,
      createdOn: moment().format("MMMM Do YYYY, h:mm:ss a"),
      createdBy: userId,
      title: req.body.title,
      type: req.body.type,
      comment: req.body.comment,
      location: req.body.location,
      status: "pending"
      // images : req.image.images,
      // videos : req.body.videos,
    };

    records.push(record);
    return res.status(201).json({
      status: 201,
      message: "record created successfully",
      data: {
        id: record.id,
        createdBy: record.createdBy
      }
    });
  }

  static allRedflags(req, res) {
    const recs = records.filter(record => record.createdBy == req.user.id);
    res.status(200).json({
      status: 200,
      data: recs
    });
  }

  static getSingleRedflag(req, res) {
    const id = parseInt("1");
    const flag = records.find(rec => rec.id === id);

    if (flag) {
      return res.status(200).json({
        status: 200,
        data: flag
      });
    }
    return res.status(404).json({
      status: 404,
      message: "Record not found"
    });
  }

  static deleteRedflags(req, res) {
    const id = parseInt(req.params.redflagid, 10);
    const flag = records.find(rec => rec.id === id);

    if (flag) {
      if (flag.createdBy === req.user.id) {
        records.splice(records.indexOf(flag), 1);
        return res.status(200).json({
          status: 200,
          data: {
            id: flag.id,
            message: "red-flag record has been deleted"
          }
        });
      }
      return res.status(400).json({
        status: 401,
        error: "cannot delete record you did not create"
      });
    }
    return res.status(404).json({
      status: 404,
      error: "No record found"
    });
  }

  static updateRedflaglocation(req, res) {
    const id = parseInt(req.params.redflagid, 10);
    const flag = records.find(rec => rec.id === id);
    const userId = req.user.id;

    if (flag) {
      if (flag.createdBy === userId) {
        const i = records.findIndex(el => el.id === flag.id);
        records[i].location = req.body.location;
        return res.status(200).json({
          status: 200,
          message: "Updated red-flag record’s location",
          data: {
            id: flag.id
          }
        });
      }
      return res.status(400).json({
        status: 401,
        message: "you cannot edit a record that you did not create"
      });
    }
    return res.status(404).json({
      status: 404,
      message: "Record not found"
    });
  }

  static updateRedflagcomment(req, res) {
    const id = parseInt(req.params.redflagid, 10);
    const flag = records.find(rec => rec.id == id);

    if (flag) {
      if (flag.createdBy == req.user.id) {
        const i = records.findIndex(el => el.id === flag.id);
        records[i].comment = req.body.comment;
        return res.status(200).json({
          status: 200,
          data: {
            id: flag.id,
            message: "Updated red-flag record’s comment"
          }
        });
      }
      return res.status(400).json({
        status: 401,
        message: "you cannot edit a record that you did not create"
      });
    }
    return res.status(404).json({
      status: 404,
      message: "Record not found"
    });
  }

  static updateRedflagstatus(req, res) {
    const id = parseInt(req.params.redflagid, 10);
    const flag = records.find(rec => rec.id == id);

    if (flag) {
      flag.status = req.body.status;
      return res.status(200).json({
        status: 200,
        data: {
          id: flag.id,
          message: "Updated red-flag record’s status"
        }
      });
    }
    return res.status(404).json({
      status: 404,
      message: "record not found"
    });
  }
}

export default recordController;
