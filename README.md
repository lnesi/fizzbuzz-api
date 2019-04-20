# FizzBuzz API

**Start**

```
npm run start
```

**Development**

```
npm run dev
```

In both cases once start or development the API will become available at `http://localhost:3000`

**Test**

```
npm run Test
```

**Test Watch (TDD)**

```
npm run test -- --watch
```

## Tests

```
PASS  src/FizzBuzz.test.js
 FizzBuzz
   getList
     ✓ returns correct page size (2ms)
     ✓ returns an array
     ✓ result is a list of FizzBuzzObjects (1ms)
     ✓ returns correct page
     ✓ returns corret item favorite (2ms)
   calculate
     ✓ returns string(Fizz) case 3 (1ms)
     ✓ returns string(Fizz) case 16362
     ✓ returns string(Buzz) case 5 (1ms)
     ✓ returns string(Buzz) case 27260
     ✓ returns string(FizzBuzz) case 15
     ✓ returns string(FizzBuzz) case 81810
     ✓ resturns default(int) numeber case 7 (1ms)

Test Suites: 1 passed, 1 total
Tests:       12 passed, 12 total
```

## End Points (API Specs)

```
GET: /api/v1/fizzbuzz?page={int=1}&size{int=100}
```

Will return the numerical series list where the value is divisible by 3 is Fizz, divisible by 5 is Buzz, divisible by 3 and 5 is FizzBuzz if not then the number.

#### Parameters (QuerySyring)

| Name | Type | Description                                                                                                                         |
| ---- | ---- | ----------------------------------------------------------------------------------------------------------------------------------- |
| page | int  | Current page default 1 if negative or 0 will default in 1                                                                           |
| size | int  | Items per page or page size default 100 if negative or 0 default to 100 if mayor than list scope (100,000,000,000) default to scope |

#### Return Object (JSON)

```json
{
  "page": {
    "current": 1,
    "total": 100000000000,
    "size": 1
  },
  "data": [
    {
      "id": 1,
      "value": 1,
      "fav": false
    }
  ]
}
```

| Name | Type                  | Description              |
| ---- | --------------------- | ------------------------ |
| page | PageObject            | Pagination Object        |
| data | Array[FizzBuzzObject] | Fizzbuzz response object |

#### PageObject

| Name    | Type | Description                                |
| ------- | ---- | ------------------------------------------ |
| current | int  | Current page index starts at 1             |
| size    | int  | Items per page                             |
| total   | int  | Total page available scope devided by size |

#### FizzBuzzObject

| Name  | Type    | Description                                                          |
| ----- | ------- | -------------------------------------------------------------------- |
| id    | int     | Id or index of item on list 0>=id<=(FIZZ_BUZZ_SCOPE=100,000,000,000) |
| value | mixed   | Integer or String constant for Fizz, Buzz and FizzBuzz               |
| fav   | boolean | Current Session favorite                                             |

```
POST: /api/v1/addfav
```

This endpoint will allow to mark a specific index on the list has favorite if post for second time (already mark as favorite) will be removed from favorites.

#### Parameters (JSON Body)

| Name | Type | Description                                                |
| ---- | ---- | ---------------------------------------------------------- |
| id   | int  | id of item in list to add to favorites id<=FIZZ_BUZZ_SCOPE |

#### Return Object (JSON)

```json
{
  "status": "ok",
  "msg": "Index 14 Added",
  "data": [15, 14]
}
```

| Name   | Type       | Description                      |
| ------ | ---------- | -------------------------------- |
| status | string     | Operation result "ok" or "error" |
| msg    | string     | Operation result details         |
| data   | Array[int] | List of id in favorites          |
