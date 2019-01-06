import {Request, Response} from "express";

const express = require('express');
const router = express.Router();

const NodeID3 = require('node-id3');

var request = require('request').defaults({ encoding: null });

import {MP3TagModel} from "../models/MP3Tag.model";
import {async} from "rxjs/internal/scheduler/async";

/*file = "D:\\Music\\Jerry Lee Lewis\\Jerry Lee Lewis - Anthology (All Killer No Filler) Disc 1 - Crazy Arms.mp3"*/
/*const file = "C:\\Users\\Matt\\Downloads\\Music\\Van Morrison\\Van Morrison - " +
    "It's Too Late To Stop Now Disc 1 - Caravan (Live At The Troubadour).mp3";*/

router.post('/read', (req: Request, res: Response) =>{
    console.log('fileLoc ' + req.body.fileLoc);
    const fileLoc = req.body.fileLoc;
    let tags = NodeID3.read(fileLoc)
    NodeID3.read(fileLoc, function(err: any, tags: any) {
        res.send({tags: tags});
    })

});

/*router.post('/write', (req: Request, res: Response) =>{
    const fileLoc = req.body.fileLoc;

    let tags = new MP3TagModel();
    tags.convertFromJSON(req.body.tags);

    let success = null;
    request.get(tags.APIC, function (err:any, res: any, body: any) {
        //process exif here
        if (!err && res.statusCode == 200) {
            // let data = "data:" + res.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
            //console.log(data);
        }
        tags.APIC = body;
        tags.raw.APIC = body;
        success  = NodeID3.write(tags, fileLoc);
    });

    res.send({msg: success});

});*/

router.post('/write', (req: Request, res: Response) =>{
    let msg = writeTags(req);
    console.log("msg" + JSON.stringify(msg));
    res.send({msg: msg});
    /*const fileLoc = req.body.fileLoc;

    let tags = new MP3TagModel();
    tags.convertFromJSON(req.body.tags);

    let success = null;
    request.get(tags.APIC, function (err:any, res: any, body: any) {
        //process exif here
        if (!err && res.statusCode == 200) {
            // let data = "data:" + res.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
            //console.log(data);
        }
        tags.APIC = body;
        tags.raw.APIC = body;
        success  = NodeID3.write(tags, fileLoc);
    });

    res.send({msg: success});
*/
});

async function writeTags(req: Request) {
    const fileLoc = req.body.fileLoc;

    let tags = new MP3TagModel();
    tags.convertFromJSON(req.body.tags);


    await request.get(tags.APIC, function (err:any, res: any, body: any) {
        //process exif here
        if (!err && res.statusCode == 200) {
            // let data = "data:" + res.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
            //console.log(data);
        }
        tags.APIC = body;
        tags.raw.APIC = body;
        // success = NodeID3.write(tags, fileLoc);
    });

    let success = await NodeID3.write(tags, fileLoc);
    console.log('success' + success);
    return {'success': success};
    // return success;

    // return await res.send({msg: success});
}



module.exports = router;

/*exports.getID3Tags = function(req, res) {
    const fileLoc = req.query.fileLoc;
    let tags = NodeID3.read(fileLoc)
    NodeID3.read(fileLoc, function(err, tags) {
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

}

exports.setID3Tags = function() {
    return null;
};



exports.removeTag = function(req, res, filepath){
    let success = NodeID3.removeTags(filepath)  //  returns true/false
    NodeID3.removeTags(filepath, function(err) {
        console.log(error);
    })
}*/
