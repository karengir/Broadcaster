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
}

export default recordController;
