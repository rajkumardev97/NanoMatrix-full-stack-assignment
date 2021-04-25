const jwt = require("jsonwebtoken");
const { appSecret } = require("../config/config");
const { handleError } = require("../utils/requestHandlers");
const { isUserExists, get } = require("../dbServices/user");
const appURI = "/api";
const skipUrls = [
  "/users/login",
  "/users/register",
  "/users/fbLogin",
  "/books/get-books-for-user",
  "/books/get-book-zip-url",
  "/utilities/csv-objects",
  "/utilities/get-book-guides-for-user",
  "/utilities/upload-assets",
];
const util = require("util");
const request = util.promisify(require("request"));

exports.isAuthenticated = async function (req, res, next) {
  const url = req.url.replace(appURI, "").split("?")[0];
  let token = req.headers["x-authorization"];
  if (skipUrls.indexOf(url) != -1) return next();
  try {
    let { userId, salt } = await jwt.verify(token, appSecret);
    let user = await get(userId);
    if (!user) throw "Invalid token,No user exists";
    if (user.salt !== salt) throw "Invalid token,No user exists";
    req.user = user;
    next();
  } catch (err) {
    handleError({ res, err, statusCode: 401 });
  }
};

exports.verifyToken = async function (req, res, next) {
  //here we check authentication of the user from thier token
  const bearerHeader = req.headers["x-authorization"];
  //console.log("bearerHeader is " + bearerHeader);
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    //  console.log(bearer);
    const bearerToken = bearer[1];

    req.token = bearerToken;

    next();
  } else {
    res.sendStatus(403); //if no user token so res will be forbidden
  }
};

exports.isTokenValid = async (req, res, next) => {
  try {
    let token = req.headers["x-authorization"];
    let url = "https://api.gamafinancial.com.br/api/login/validateToken";
    let options = {
      method: "GET",
      url: url,
      headers: {
        Authorization: `${token}`,
      },
    };
    let { body } = await request(options);
    let result = JSON.parse(body);
    if (!result.data || !result.data.authenticated)
      throw "invalid token or token expired";
    next();
  } catch (err) {
    handleError({ res, err, statusCode: 401 });
  }
};
