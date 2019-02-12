"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import {Response} from "request";*/
var path = require('path');
var fs = require('fs');
const express = require('express');
const request = require('request');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './imageUploads/');
    },
    filename: function (req, file, cb) {
        // console.log('file.originalName ' + file.originalname);
        let fileName = fileExists(file.originalname);
        // console.log('fileName ' + fileName);
        cb(null, fileName);
    }
});
function fileExists(filename) {
    let dest = './imageUploads/' + filename;
    // console.log(dest);
    // console.log(typeof (dest));
    try {
        if (fs.existsSync(dest)) {
            return filename;
        }
        else {
            return filename;
        }
    }
    catch (err) {
        console.error(err);
    }
    /*fs.existsSync('./imageUploads/' + filename, function(exists: any) {
        if (exists) {
            console.log(typeof (filename + Date.now()));
            return filename + Date.now();
        } else {
            return filename;
        }
    });*/
}
const upload = multer({ storage: storage });
const router = express.Router();
router.post('/', upload.single('img'), (req, res) => {
    // console.log(req);
    if (req.file) {
        // console.log('req.file ' + req.file);
        const newPath = req.file.path.replace(/\\/g, '\/');
        // console.log('newPath ' + newPath);
        res.status(200).json({
            // msg: 'file ' + req.file.path+ ' uploaded'
            fileLoc: 'http://localhost:3000/' + newPath
        });
    }
    res.status(500);
});
module.exports = router;
//# sourceMappingURL=imageUpload.js.map