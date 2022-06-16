import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import fs from 'fs';
import jimp from 'jimp';
import winston from './winston';
import path from "path";

aws.config.update({
    secretAccessKey: config.aws.s3.secretAccessKey,
    accessKeyId: config.aws.s3.accessKeyId,
    region: config.aws.s3.region
});
const BUCKET = config.aws.s3.bucket
const s3 = new aws.S3();
export const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: BUCKET,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname)
        }
    })
})

