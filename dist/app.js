"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set("port", process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/imageUploads', express.static('imageUploads'));
/*app.use(app.router);*/
app.use(express.static(path.join(__dirname, 'public')));
const youTubeInfoRoutes = require('./api/routes/youTubeInfo');
const webPageInfoRoutes = require('./api/routes/webPageInfo');
const MP3TagRoutes = require('./api/routes/MP3Tag');
const weatherRoutes = require('./api/routes/weatherInfo');
const imageUploadRoutes = require('./api/routes/imageUpload');
const youTubeDownloadRoutes = require('./api/routes/youTubeDownload');
const ID3TagRoutes = require('./api/routes/ID3TagService');
app.use('/youTubeInfo', youTubeInfoRoutes);
app.use('/webPageInfo', webPageInfoRoutes);
app.use('/MP3Tag', MP3TagRoutes);
app.use('/weatherInfo', weatherRoutes);
app.use('/imageUpload', imageUploadRoutes);
app.use('/youTubeDL', youTubeDownloadRoutes);
app.use('/ID3Tags', ID3TagRoutes);
exports.default = app;
// module.exports = app;
//# sourceMappingURL=app.js.map