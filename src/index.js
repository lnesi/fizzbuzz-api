const express = require("express");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const PORT = process.env.PORT || 3000;
const FizzBuzz = require("./FizzBuzz");

const app = express();
// Body parser for JSON payloads injest
app.use(bodyParser.json());
//Secure app with common headers https://helmetjs.github.io/
app.use(helmet());
// Cookie based session
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEY || "this-is-random-hash"],
    maxAge: process.env.COOKIE_MAX_AGE || 60 * 60 * 1000 //1 hour
  })
);
//Session Handler for create session when empty
function sessionHandler(req, res, next) {
  if (!req.session.favorites) {
    req.session.favorites = [];
  }
  next();
}
app.use(sessionHandler);

//Welcome Page
app.get("/", (req, res) => res.send("Fizz Buzz API!"));

//fizz buzz json API
app.get("/api/v1/fizzbuzz", (req, res) => {
  // Getting Pagination Parameters
  // Web can do error handling here instead of condition with parseInt
  // or forcing unallowed values to the default.
  let currentPage = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  // Reset to 1 un allowed negative and 0;
  if (currentPage <= 0) currentPage = 1;
  let pageSize = parseInt(req.query.size) ? parseInt(req.query.size) : 100;
  //Constrain Page Size
  if (pageSize > FizzBuzz.LIST_SCOPE) pageSize = FizzBuzz.LIST_SCOPE;
  let totalPages = Math.ceil(FizzBuzz.LIST_SCOPE / pageSize);
  //Constain current page
  if (currentPage > totalPages) currentPage = totalPages;

  const list = FizzBuzz.getList(
    currentPage - 1,
    pageSize,
    req.session.favorites
  );
  console.log(req.session.favorites);
  return res.send({
    page: {
      current: currentPage,
      total: totalPages,
      size: pageSize
    },
    data: list
  });
});

app.get("/api/v1/favorites", (req, res) => {
  res.send({
    data: req.session.favorites.map(id => {
      return { id, value: FizzBuzz.calculate(id) };
    })
  });
});

app.post("/api/v1/favorites", (req, res) => {
  if (!isNaN(req.body.id)) {
    if (req.body.id > 0 && req.body.id <= FizzBuzz.LIST_SCOPE) {
      if (req.session.favorites.indexOf(parseInt(req.body.id)) === -1) {
        req.session.favorites.push(parseInt(req.body.id));
        return res.send({
          status: "ok",
          msg: `Index ${req.body.id} Added`,
          data: req.session.favorites
        });
      } else {
        req.session.favorites.splice(
          req.session.favorites.indexOf(parseInt(req.body.id)),
          1
        );
        return res.send({
          status: "ok",
          msg: `Index ${req.body.id} removed`,
          data: req.session.favorites
        });
      }
    } else {
      res.status(400);
      return res.send({ status: "error", msg: "id out of bounds" });
    }
  } else {
    res.status(400);
    return res.send({ status: "error", msg: "Invalid POST id(int) required" });
  }
});
app.listen(PORT);
