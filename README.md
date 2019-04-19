# FizzBuzz API  

Start
```
npm run start
```

Development
```
npm run dev
```

In both cases once start or development the API will become available at ```http://localhost:3000```

## End Points (API Specs)

```
GET: /api/v1/fizzbuzz?page={int=1}&size{int=100}
```
Will return the numerical series list where  the value is divisible by 3 is Fizz, divisible by 5 is Buzz, divisible by 3 and 5 is FizzBuzz if not then the number.

#### Parameters (QuerySyring)

|Name    | Type  | Description    |
|--------|-------|----------------|
|page    |int  | Current page default 1 if negative or 0 will default in 1 |
|size    |int   | Items per page or page size default 100 if negative or 0 default to 100 if mayor than list scope (100,000,000,000) default to scope |

#### Return Object (JSON)

|Name    | Type  | Description    |
|--------|-------|----------------|
|page    | PageObject| Pagination Object |
|data    | Array[FizzBuzzObject]| Fizzbuzz response object |

#### PageObject

|Name    | Type  | Description    |
|--------|-------|----------------|
|current | int   | Current page index starts at 1 |
|size    | int   | Items per page |  
|total    | int| Total page available scope devided by size |

#### FizzBuzzObject

|Name    | Type  | Description    |
|--------|-------|----------------|
|id      | int   | Id or index of item on list 0>=id<=(FIZZ_BUZZ_SCOPE=100,000,000,000) |
|value    | mixed   | Integer or String constant for Fizz, Buzz and FizzBuzz |  
|fav   | boolean| Current Session favorite  |

```
POST: /api/v1/addfav
```
This endpoint will allow to mark a specific index on the list has favorite if post for second time (already mark as favorite) will be removed from favorites.
