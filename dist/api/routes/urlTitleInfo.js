"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import {Response} from "request";*/
const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();
router.post('/', (req, res) => {
    if (req.query.url) {
        request(req.query.url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(body);
                const webpageTitle = $("title").text();
                const metaDescription = $('meta[name=description]').attr("content");
                const webpage = {
                    title: webpageTitle,
                    metaDescription: metaDescription
                };
                res.send(webpage);
            }
        });
    }
    ;
});
module.exports = router;
//# sourceMappingURL=urlTitleInfo.js.map