/* eslint-disable node/no-unsupported-features/es-syntax */
import Router from 'express';
import recordController from '../controlers/recordController';
import tokenVerify from '../helper/tokenVerify';
import {createRecord} from '../middleware/validation';


const router = Router(); 

router.post('/', createRecord, tokenVerify, (req,res) => {
    recordController.AddRecord(req,res);
});
router.get('/red-flags', recordController.allRedflags);


export default router;