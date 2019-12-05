import Router from "express";
import upload from "../middleware/filefolder";
import recordController from "../controlers/recordController";
import tokenVerify from "../helper/tokenVerify";
import { createRecord } from "../middleware/validation";
import tokenVerifyAdmin from "../helper/tokenVerifyAdmin";

const router = Router();

// router.delete("/:redflagid", tokenVerify, recordController.deleteRedflags);

router.post("/", tokenVerify, createRecord, recordController.AddRecord);

router.get("/red-flags", tokenVerify, recordController.allRedflags);

// router.patch(
//   "/:redflagid/location",
//   tokenVerify,
//   recordController.updateRedflaglocation
// );

// router.patch(
//   "/:redflagid/comment",
//   tokenVerify,
//   recordController.updateRedflagcomment
// );

router.get("/:redflagid", recordController.getSingleRedflag);

// router.patch(
//   "/:redflagid/status",
//   tokenVerifyAdmin,
//   recordController.updateRedflagstatus
// );

export default router;
