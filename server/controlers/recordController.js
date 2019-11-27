/* eslint-disable radix */
/* eslint-disable node/no-unsupported-features/es-syntax */
import moment from 'moment';
import records from '../models/record';


class recordController{

    static AddRecord (req, res){
        const userId = req.user.id;
        const record = {
            id: records.length + 1,
            createdOn : moment().format('MMMM Do YYYY, h:mm:ss a'),
            createdBy : userId,
            title: req.body.title,
            type : req.body.type,
            comment : req.body.comment,
            location : req.body.location,
            status : req.body.status,
            // images : req.image.images,
            // videos : req.body.videos,
        };

        records.push(record);
        res.status(201).json({
            status: 201,
            message: 'record created successfully',
            data: {
                id: record.id,
                createdBy: record.createdBy,
            }
        });
    }

    static allRedflags (req,res){
        res.status(200).json({
            status:200,
            data: records
        });
    }

    static getSingleRedflag (req, res){
        const id = parseInt(req.params.redflagid)
        const flag = records.find(rec=> rec.id === id)

        if(flag){
            res.status(200).json({
                status: 200,
                data: flag
            });
        } else {
            res.status(404).json({
                status:404,
                message: 'Record not found'
            })
        }
    }
}

export default recordController;