var express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config/config");

var indexRouter = require("./routes/index");

var app = express();

logger = require("./utils/logger");

var publicDir = require("path").join(__dirname, "public");
app.use(express.static(publicDir));
 

// Body parser middleware

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());

// Morgan: is another HTTP request logger middleware for Node.js. It simplifies the process of logging requests to your application. You might think of Morgan as a helper that collects logs from your server, such as your request logs. It saves developers time because they don’t have to manually create common logs. It standardizes and automatically creates request logs.
// Morgan can operate standalone, but commonly it’s used in combination with Winston. Winston is able to transport logs to an external location, or query them when analyzing a problem.
app.use(
  require("morgan")(
    function (tokens, req, res) {
      let ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
      let accessToken = `accessToken:-${req.headers["x-authorization"] + ""}`;
      return [
        req.user && req.user._id,
        ip,
        accessToken,
        tokens["remote-user"](req, res),
        tokens.date(req, res, "clf"),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["referrer"](req, res),
        tokens["user-agent"](req, res),
        tokens["response-time"](req, res),
        "ms",
      ].join(" ");
    },
    { stream: logger.stream }
  )
);

// Use Routes
app.use("/", indexRouter);

module.exports = app;
