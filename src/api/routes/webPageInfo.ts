import {Request, Response} from "express";
// import {Response} from "request";*/


const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();

router.post('/', (req: Request, res: Response) => {
    // console.log('req.body.url' + req.body.url);
    if(req.body.url){
        request(req.body.url, function (error: Error, response: Response, body: any) {
            if (!error && response.statusCode == 200) {

                const $ = cheerio.load(body);
                const webpageTitle = $("title").text();
                const metaDescription =  $('meta[name=description]').attr("content");
                const webpage = {
                    title: webpageTitle,
                        metaDescription: metaDescription
                }
                // res.send(JSON.stringify(webpage));
                res.status(200).json({
                    title: webpageTitle,
                    metaDescription: metaDescription
                })
            }
        });
    };
    res.status(500);
});

module.exports = router;