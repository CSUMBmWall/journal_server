import {Response} from "express";
import { YouTubeInfoModel } from "../models/youTubeInfo.model";

const express = require('express');
const router = express.Router();
const request = require('request');
/*export default new YouTubeInfo().express*/

const ytURLPrefix = 'https://www.googleapis.com/youtube/v3/videos?key=';
const ytURLPostfix = '&part=snippet&id=';
const ytPassword = process.env.YT;


// fix any types -- add class for expected data and find out what type request.body is
router.post('/', (req: any, res: Response, next: any) => {

    var myRe = /=(.*)/g;
    var myArray = myRe.exec(req.body.id);
    var ytID = null;

    if (myArray) {
        ytID = myArray[1];
        var ytRequestURL = ytURLPrefix + ytPassword + ytURLPostfix + ytID;

        request.get(ytRequestURL, (err: Error, response: Response, body: any) => {
            if (err) {
                res.status(500).json({
                    error: err
                })
            } else if (!body || JSON.parse(body).pageInfo.totalResults === 0) {
                res.status(404).json({
                    message: "Video Info not found"
                });
            } else {
                let jsonBody = JSON.parse(body).items[0].snippet;
                // let jsonBody = body.items[0].snippet;
                let youTubeInfo = new YouTubeInfoModel();
                youTubeInfo.title = jsonBody.title;
                youTubeInfo.description = jsonBody.description;
                youTubeInfo.thumbnail = jsonBody.thumbnails.default;
                youTubeInfo.tags = jsonBody.tags;
                res.status(200).send(youTubeInfo);
            }
        });

    } else {
        res.status(404).json({error: 'Could not retrieve id from YouTube URL'});
    }


});

module.exports = router;
