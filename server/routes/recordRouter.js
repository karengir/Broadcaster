/* eslint-disable node/no-unsupported-features/es-syntax */
import Router from 'express';
import recordController from '../controlers/recordController';
import tokenVerify from '../helper/tokenVerify';
import {createRecord} from '../middleware/validation';


const router = Router(); 

router.delete('/:redflagid', (req, res) => {
    return res.status(200).json({
        data: 'data'
    })
});
router.post('/', createRecord, tokenVerify,recordController.AddRecord);
router.get('/red-flags', recordController.allRedflags);


router.get('/:redflagid', (req, res) => {
    recordController.getSingleRedflag(req,res);
});

export default router;