import {Request, Response} from "express";
import { Response as reqRes}  from "request";
import { MP3TagModel } from "../models/MP3Tag.model";
import request = require("request");
import {async} from "rxjs/internal/scheduler/async";

const express = require('express');
const router = express.Router();
const NodeID3 = require('node-id3');
const fs = require('fs');
const path = require('path');

/*file = "D:\\Music\\Jerry Lee Lewis\\Jerry Lee Lewis - Anthology (All Killer No Filler) Disc 1 - Crazy Arms.mp3"*/
let file = "D:\\Music\\Aretha Franklin - YouTube -  Do Right Woman Do Right Man.mp3";

// Get file info
router.post('/read', (req: Request, res: Response) => {
    const fileLoc = req.body.fileLoc;
    let tags: MP3TagModel = NodeID3.read(fileLoc)
    NodeID3.read(fileLoc, function(err: Error, tags: any) {
        console.log(tags);
        console.log(typeof(tags));
        res.send({tags: tags});
    })
});

router.post('/write', (req: Request, res: Response) => {
    let img = req.body.tag.APIC;
    let tempFile = 'temp';
    if (img) { tempFile += path.extname(img);}

    // downloadImage(img, tempFile)
    //     .then(NodeID3.update(req.body.tag, req.body.fileLoc));







   /*console.log(req.body);
   res.send(req.body);*/
});

const setMP3Tag = (tag: MP3TagModel, fileLoc: string) => {
    let success = NodeID3.update(tag, fileLoc);
    return success;
};


const downloadImage = function(uri: any, filename: any){
    request.head(uri, function(err: Error, res: reqRes, body: any){
        if (err) {
            console.log(err);
            return { error: err };
        } else {
            // console.log('content-type:', res.headers['content-type']);
            // console.log('content-length:', res.headers['content-length']);

            request(uri).pipe(fs.createWriteStream(filename))
                .then(() => {return});
        }
    });

};

/*
const downloadImage = function(uri: any, filename: any, callback: any){
    request.head(uri, function(err: Error, res: reqRes, body: any){
        if (err) {
            console.log(err);
        } else {
            // console.log('content-type:', res.headers['content-type']);
            // console.log('content-length:', res.headers['content-length']);

            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        }
    });

};

*/

/*download('http://afropea-mag.com/wp-content/uploads/2016/06/aretha-franklin-770.jpg', 'google.png', function(){
    console.log('done');
});*/

// async function




/*async function foo() {
    try {
        const result = await doSomething();
        const newResult = await doSomethingElse(result);
        const finalResult = await doThirdThing(newResult);
        console.log(`Got the final result: ${finalResult}`);
    } catch(error) {
        failureCallback(error);
    }
}*/

/*
* download image file if it is in req.body
* then write MP3 tag
* then delete image file
* then return success!
* */








/*exports.getID3Tags = function(req: Request, res: Response) {
    const fileLoc = req.body.fileLoc;
    let tags: MP3TagModel = NodeID3.read(fileLoc)
    NodeID3.read(fileLoc, function(err: Error, tags: MP3TagModel) {
        /!*
        tags: {
          title: "Tomorrow",
          artist: "Kevin Penkin",
          image: {
            mime: "jpeg",
            type: {
              id: 3,
              name: "front cover"
            },
            description: String,
            imageBuffer: Buffer
          },
          raw: {
            TIT2: "Tomorrow",
            TPE1: "Kevin Penkin",
            APIC: Object (See above)
          }
        }
        *!/
        console.log(tags);
        res.send({tags: tags});
    })

};*/

/*exports.setID3Tags = function() {
    return null;
};*/



/*exports.removeTag = function(req, res, filepath){
    let success = NodeID3.removeTags(filepath)  //  returns true/false
    NodeID3.removeTags(filepath, function(err) {
        console.log(error);
    })
}*/

module.exports = router;