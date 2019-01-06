const http = require('http');
// const app = require('./app');
import app from './app';

/*
const port = process.env.PORT || 3200;

const server = http.createServer(app);

server.listen(port);*/

const server = app.listen(app.get("port"), () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});


export default server;