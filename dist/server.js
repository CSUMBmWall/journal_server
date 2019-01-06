"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require('http');
// const app = require('./app');
const app_1 = require("./app");
/*
const port = process.env.PORT || 3200;

const server = http.createServer(app);

server.listen(port);*/
const server = app_1.default.listen(app_1.default.get("port"), () => {
    console.log("  App is running at http://localhost:%d in %s mode", app_1.default.get("port"), app_1.default.get("env"));
    console.log("  Press CTRL-C to stop\n");
});
exports.default = server;
//# sourceMappingURL=server.js.map