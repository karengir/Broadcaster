import moment from "moment";
import records from "../models/record";
import queries from "../db/queries";
import executeQuerry from "../db/connection";

class recordController {
  static async AddRecord(req, res) {
    const userid = req.userId;
    const record = {
      title: req.body.title,
      type: req.body.type,
      comment: req.body.comment,
      location: req.body.location,
      status: "pending",
      createdOn: moment().format("MMMM Do YYYY, h:mm:ss a"),
      createdBy: userid
    };

    let parameters = [
      record.title,
      record.type,
      record.comment,
      record.location,
      record.status,
      record.createdOn,
      record.createdBy
    ];

    const newRecord = await executeQuerry(queries[1].createRecord, parameters);
    if (newRecord.rowCount === 1 || newRecord.length === 1) {
      return res.status(201).json({
        status: 201,
        message: "record created successfully",
        data: newRecord
      });
    }
  }

  static async allRedflags(req, res) {
    const recs = await executeQuerry(queries[1].getAllRecords);
    res.status(200).json({
      status: 200,
      data: recs
    });
  }

  static async getSingleRedflag(req, res) {
    const id = parseInt(req.params.redflagid, 10);
    const flag = await executeQuerry(queries[1].getRecord, [id]);
    if (flag.length === 1) {
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

  static async updateRedflaglocation(req, res) {
    const id = parseInt(req.params.redflagid, 10);
    const flag = await executeQuerry(queries[1].getRecord, [id]);
    const userId = req.userId;

    if (flag.length === 1) {
      if (flag[0].createdby == userId) {
        const { location } = req.body;
        const flag2 = await executeQuerry(queries[1].editRecordLocation, [
          location,
          id
        ]);
        return res.status(200).json({
          status: 200,
          message: "Updated red-flag record’s location",
          data: {
            id: flag2[0].id,
            location: flag2[0].location
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

  static async updateRedflagcomment(req, res) {
    const id = parseInt(req.params.redflagid, 10);
    const flag = await executeQuerry(queries[1].getRecord, [id]);
    const userId = req.userId;

    if (flag.length === 1) {
      if (flag[0].createdby == userId) {
        const { comment } = req.body;
        const flag2 = await executeQuerry(queries[1].editRecordComment, [
          comment,
          id
        ]);
        return res.status(200).json({
          status: 200,
          message: "Updated red-flag record’s comment",
          data: {
            id: flag2[0].id,
            location: flag2[0].comment
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

  static async updateRedflagstatus(req, res) {
    const id = parseInt(req.params.redflagid, 10);
    const flag = await executeQuerry(queries[1].getRecord, [id]);

    if (flag.length === 1) {
      const { status } = req.body;
      const flag2 = await executeQuerry(queries[1].editRecordStatus, [
        status,
        id
      ]);
      return res.status(200).json({
        status: 200,
        message: "Updated red-flag record’s status",
        data: {
          id: flag2[0].id,
          status: flag2[0].status
        }
      });
    }
    return res.status(404).json({
      status: 404,
      message: "record not found"
    });
  }

  static async deleteRedflags(req, res) {
    const id = parseInt(req.params.redflagid, 10);
    const flag = await executeQuerry(queries[1].getRecord, [id]);
    const userId = req.userId;

    if (flag.length === 1) {
      if (flag[0].createdby == userId) {
        const flag2 = await executeQuerry(queries[1].deleteRecord, [id]);

        return res.status(200).json({
          status: 200,
          message: "red-flag record has been deleted"
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
}

export default recordController;
