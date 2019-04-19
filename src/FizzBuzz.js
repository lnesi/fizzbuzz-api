const FIZZ_RULE = 3;
const BUZZ_RULE = 5;
const FIZZ_BUZZ_RULE = 15;
const LIST_SCOPE = 100000000000;

function getList(currentPage, pageSize, favorites = []) {
  const result = [];
  const pageStart = pageSize * currentPage;
  for (let i = 1; i <= pageSize; i++) {
    let index = pageStart + i;
    // we can make fav binary to reduce size of stream
    let fav = false;
    if (favorites.indexOf(index) !== -1) fav = true;
    result.push({ id: index, value: calculate(index), fav });
  }
  return result;
}

function calculate(index) {
  if (index % FIZZ_BUZZ_RULE === 0) {
    return "FizzBuzz";
  } else if (index % BUZZ_RULE === 0) {
    return "Buzz";
  } else if (index % FIZZ_RULE === 0) {
    return "Fizz";
  }
  return index;
}
module.exports = { getList, FIZZ_RULE, BUZZ_RULE, FIZZ_BUZZ_RULE, LIST_SCOPE };
