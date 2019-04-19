const express = require("express");
const cookieSession = require("cookie-session");
const FizzBuzz = require("./FizzBuzz");

const app = express();
app.set('trust proxy', 1)
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEY || "this-is-random-hash"],
    maxAge: process.env.COOKIE_MAX_AGE || 60 * 60 * 1000 //1 hour
  })
);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Fizz Buzz API!"));

app.get("/api/v1/fizzbuzz", (req, res) => {
  if(!req.session.favorites){
    req.session.favorites=[]
  }

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

  const list = FizzBuzz.getList(currentPage - 1, pageSize);
  res.send({
    page: {
      current: currentPage,
      total: totalPages,
      size: pageSize
    },
    data: list
  });
});

app.listen(PORT);
