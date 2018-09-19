# Data Access Notes

### Pre-Configuration

Install postman

https://www.getpostman.com/

Install body-parser

```
npm install --save body-parser
```

### Files Added + Modified

**(A)** [`server.js`](./server.js) :
  1. import body-parser library. 
  2. configure with express app
  

**(B)** `/src/routes/apiRouter.js`
  1. Create GET Routes
    i. : declare fetch-many GET route
    ii. : declare fetch-one GET route
    iii. : create `fetchMany` function
    iv. : create `fetchOne` function

  2. Create POST Route
    i. : declare POST route
    ii. : create `createOneProduct` function

  3. Create PUT Route
    i. : declare PUT route
    ii. : create `editOneProduct` function

  4. Create DELETE Route
    i. : declare DELETE route   
    ii. : create `deleteOneProduct` function
  
