import {Request, Response} from "express";

const express = require('express');
const router = express.Router();
var youTubeDLService = require('youtube-dl');

/*var fs = require('fs');
var ytdl = require('ytdl-core');

const { spawn } = require('child_process');*/

/*exports.getYouTubeDL = function(req, res) {
    /!*console.log('youtubeDL.js.videoInfo.url', req.query.url);*!/
    const url =  req.query.url;
    const folder = req.query.folder;
    const fileName = req.query.artist + ' - ' + req.query.album + ' - ' + req.query.title;
    const outPutFileName = folder + fileName;

    youTubeDLService.exec(url, ['-x', '--audio-format', 'mp3', '-o', folder + fileName + '.%(ext)s'], {}, function exec(err, output) {
        'use strict';
        if (err) { throw err; }
        /!*var msgs = [];
        output.forEach(function(msg) {
            if (msg.includes('[ffmpeg] Destination:')) {
                const pos = msg.indexOf(':') ;
                const status = msg.slice(pos + 1);
                /!*msgs.push(msg.slice(pos + 2));*!/
                msgs.push(status);


            }
        })*!/
        //console.log(typeof(output));
        res.send({resp: output});
        // res.send({status: output});
    });
};*/


router.post('/', (req: Request, res: Response, next: any) => {

    const folder = req.body.fileLoc;
    const ytVideoInfo = req.body.ytVideoInfo;
    const url = ytVideoInfo.url;
    const fileName = ytVideoInfo.artist + ' - ' + ytVideoInfo.album + ' - ' + ytVideoInfo.title;
    const outPutFileName = folder + fileName;
    //
    // console.log('url ' + url);

    youTubeDLService.exec(url, ['-x', '--audio-format', 'mp3', '-o', outPutFileName + '.%(ext)s'], {}, function exec(err: any, output: any) {
        'use strict';
        if (err) { throw err; }
        var re = '[ffmpeg] Destination:';
        output = output.filter((x: any) => { return x.includes(re) });
        if (output[0]) {
            res.send({fileLoc: output[0].replace(re, '').trim()});
        }
        else { res.send({ error: "Location not Found"}); }
    });

});

module.exports = router;

/*exports.getYouTubeDL = function(req: Request, res: Response) {
    /!*console.log('youtubeDL.js.videoInfo.url', req.query.url);*!/
    const url =  req.query.url;
    const folder = req.query.folder;
    const fileName = req.query.artist + ' - ' + req.query.album + ' - ' + req.query.title;
    const outPutFileName = folder + fileName;

    youTubeDLService.exec(url, ['-x', '--audio-format', 'mp3', '-o', outPutFileName + '.%(ext)s'], {}, function exec(err: any, output: any) {
        'use strict';
        if (err) { throw err; }
        var re = '[ffmpeg] Destination:';
        output = output.filter((x: any) => { return x.includes(re) });
        if (output[0]) {
            res.send({fileLoc: output[0].replace(re, '').trim()});
        }
        else { res.send({ error: "Location not Found"}); }


        /!* var msgs = [];
         output.forEach(function(msg) {
             var re = /\[ffmpeg] Destination:/;
             if (msg.includes(re)) {
                 const pos = msg.indexOf(':') ;
                 const status = msg.slice(pos + 1);
                 /!*msgs.push(msg.slice(pos + 2));*!/
                 msgs.push(status);


             }
         })*!/
        // res.send({resp: output});
        // res.send({status: output});
    });
};*/
