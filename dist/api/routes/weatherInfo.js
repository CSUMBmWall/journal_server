"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import {Response} from "request";*/
const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();
const weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=Monterey,%20us&units=imperial&appid=60ce7f6d78dfb58ad8bb6f90b7fda9b3";
router.get('/', (req, res) => {
    // request()
    // console.log(req.body.url);
    request(weatherUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.status(200).json(body);
        }
    });
    res.status(500);
});
module.exports = router;
//# sourceMappingURL=weatherInfo.js.map