const Router = require('express').Router
const Vendor = require('../models/Vendor.js')
const Product = require('../models/Product.js')

const apiRouter  = Router()

// ** B.2 Model Queries **

const showRouteListing = (req, res)=>{
  res.json({
    '/api/users' : 'Show users',
    '/api/messages' : 'Show messages'
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

const createOneProduct = function(req, res){
  // ** A.3 + B.3 req.body **
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

const editOneProduct = (req, res)=>{
  Product
   .query()
   .updateAndFetchById( req.params._id , req.body )
   .then((updatedRecord)=>{
     res.status(200).json(updatedRecord)
   })
}

const deleteOneProduct = (req, res)=>{
  Product.query()
    .deleteById(req.params._id)
    .then((dbResponse)=>{
      res.status(200).json(dbResponse)
    })
}


apiRouter.get('/', showRouteListing)


// ** B.1 REST ROUTES **
apiRouter
  .get('/vendors', fetchManyVendors)
  .get('/vendors/:_id', fetchOneVendor)


apiRouter
  .get('/products', fetchManyProducts)
  .get('/products/:_id', fetchOneProduct)
  .post('/products', createOneProduct)
  .put('/products/:_id', editOneProduct )
  .delete('/products/:_id', deleteOneProduct)


module.exports = apiRouter
