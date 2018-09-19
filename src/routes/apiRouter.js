const Router = require('express').Router
const Vendor = require('../models/Vendor.js')
const Product = require('../models/Product.js')

const apiRouter  = Router()

const showRouteListing = (req, res)=>{
  res.json({
    '/api/products' : 'products',
    '/api/vendors' : 'vendors'
  })
}

const fetchManyVendors = (req, res)=>{
  Vendor.query()
    .eager('products')
    .then((recordsWithProducts)=>{
      res.status(200).json(recordsWithProducts)
    })
    .catch((err)=>{
      console.log("ooppps!");
      var errorMessage = err.toString()
      res.status(500).send(errorMessage)
    })

}

const fetchOneVendor = (req, res)=>{
  const db = req.app.locals.db

  const idInRoute = req.params._id
  console.log(idInRoute);

  db.select('*').from('vendors')
    .where('id', '=', idInRoute)
    .then((records)=>{
      res.json(records[0])
    })

}

// B.1.iii - create `fetchManyProducts` function
const fetchManyProducts = async function(req, res){
  try {
    const recordsWithCompanies = await Product.query()
      .eager('vendor')
    res.status(200).json(recordsWithCompanies)

  } catch (err){
    var errorMessage = err.toString()
    res.status(500).send(errorMessage)
  }
}

// B.1.iv - create `fetchOneProduct` function
const fetchOneProduct = async (req, res)=>{
  try {
    const productRecord = await Product
      .query()
      .findById(req.params._id)
  } catch (err) {
    
    const errorMessage = err.toString()
    res.status(500).send(errorMessage)    
  } 
}


// B.2.ii - create `createOneProduct` function
const createOneProduct = function(req, res){
  //       body parser + express puts incoming
  //       ContentType application/json
  //       data on req.body
  
  console.log(req.body)
  Product
    .query()
    .insert(req.body)
    .then((newRecord)=>{
      res.status(200).json(newRecord)
    })
}

// B.3.ii - create `editOneProduct` function
const editOneProduct = (req, res)=>{
  Product
   .query()
   .updateAndFetchById( req.params._id , req.body )
   .then((updatedRecord)=>{
     res.status(200).json(updatedRecord)
   })
}

// B.4.ii - create `deleteOneProduct` function
const deleteOneProduct = (req, res)=>{
  Product.query()
    .deleteById(req.params._id)
    .then((dbResponse)=>{
      res.status(200).json(dbResponse)
    })
}


apiRouter.get('/', showRouteListing)


apiRouter
  .get('/vendors', fetchManyVendors)
  .get('/vendors/:_id', fetchOneVendor)

// ** B.2 Model Queries **
apiRouter
  .get('/products', fetchManyProducts)        // ** B.1.i GET route, fetch-many **
  .get('/products/:_id', fetchOneProduct)     // ** B.1.i GET route, fetch-one  **
  .post('/products', createOneProduct).       // ** B.2.i POST route, create-one * *
  .put('/products/:_id', editOneProduct ).    // ** B.3.i EDIT route, edit-one  **
  .delete('/products/:_id', deleteOneProduct) // ** B.4.i DELETE route, delete-one **


module.exports = apiRouter
