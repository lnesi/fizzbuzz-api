const FIZZ_RULE = 3;
const BUZZ_RULE = 5;
const FIZZ_BUZZ_RULE = 15;
const LIST_SCOPE = 100000000000;

/**
 * Get paginated list of fizz buzz
 * @param currentPageIndex  int page 0 index based
 * @param pageSize  int page size
 * @return array(FizzBuzzObject) currentPage of fizzbuzz game
 */
function getList(currentPageIndex = 0, pageSize = 100, favorites = []) {
  const result = [];
  const pageStart = pageSize * currentPageIndex;
  for (let i = 1; i <= pageSize; i++) {
    let index = pageStart + i;
    // we can make fav binary to reduce size of stream
    let fav = false;
    if (favorites.indexOf(index) !== -1) fav = true;
    result.push({ id: index, value: calculate(index), fav });
  }
  return result;
}

/**
 * Calulate fizz buzz
 * @param index  int id or index of list item to return
 * @return mix string or integer
 */
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
