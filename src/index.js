const express = require("express");
const FizzBuzz = require("./FizzBuzz");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Fizz Buzz API!"));
app.get("/api/v1/fizzbuzz", (req, res) => {
  // Getting Pagination Parameters
  // Web can do error handling here instead of condition with parseInt
  // or forcing unallowed values to the default.
  let currentPage = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  // Reset to 1 un allowed negative and 0;
  if(currentPage<=0)currentPage=1;
  let pageSize = parseInt(req.query.size) ? parseInt(req.query.size) : 100;
  //Constrain Page Size
  if(pageSize>FizzBuzz.LIST_SCOPE )pageSize=FizzBuzz.LIST_SCOPE;
  let totalPages=Math.ceil(FizzBuzz.LIST_SCOPE / pageSize);
  //Constain current page
  if(currentPage>totalPages) currentPage = totalPages;

  const list = FizzBuzz.getList(currentPage-1, pageSize);
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
