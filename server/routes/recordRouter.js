import Router from "express";
import upload from "../middleware/filefolder";
import recordController from "../controlers/recordController";
import tokenVerify from "../helper/tokenVerify";
import { createRecord } from "../middleware/validation";

const router = Router();

router.delete("/:redflagid", tokenVerify, recordController.deleteRedflags);

router.post("/", tokenVerify, createRecord, recordController.AddRecord);

router.get("/red-flags", tokenVerify, recordController.allRedflags);

router.patch(
  "/:redflagid/location",
  tokenVerify,
  recordController.updateRedflaglocation
);

router.patch(
  "/:redflagid/comment",
  tokenVerify,
  recordController.updateRedflagcomment
);

router.get("/:redflagid", recordController.getSingleRedflag);

export default router;
