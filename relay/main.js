require("dotenv").config();
const Gun = require("gun");

const server = require("http").createServer().listen(8000);
Gun({ web: server });
