const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const { ObjectId } = require('mongodb');
const db = require('../db');



const PORT = 8092;
const app = express();
module.exports = app;

async function connection(){
  await db.connect();
}


app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

var products = "";

console.log(`📡 Running on port ${PORT}`);


// All products 
app.get('/products', async(request, response) => {
  products = await db.findAllProducts(true)
  console.log(products.length)
  response.send({"products" : products});
})


// Product search, Search for specific product 
app.get('/products/search', async(request, response) => {
  const filters = request.query;
  console.log('filters :>> ', filters);
  
  const brand = filters.brand !== undefined ? filters.brand : ''
  const price = parseInt(filters.price,10) > 0 ? parseInt(filters.price,10) : ''
  const limit = parseInt(filters.limit,10) > 0 ? parseInt(filters.limit,10) : 12

  var match = {}
  if( brand === '' &&  price !== '') match = {price: price} 
  else if(brand !== '' && price === '') match = {brand: brand}
  else if(brand !== '' && price !== '') match = {brand: brand, price: price}

  query = [
    {'$match' : match},
    {'$sort' : {price:1}},
    {'$limit' : limit}
    ]
  console.log('query :>> ', query);
  
  var filteredProducts = await db.aggregateQuery(query)

  console.log('filteredProducts.length :>> ', filteredProducts.length);
  response.send(filteredProducts);
})


// Products by id
app.get('/products/:_id',  async(request, response) => {
  products = await db.findProducts({'_id': new ObjectId(request.params._id)}, false)
  response.send({"count" : products.length, "products" : products});
})


// Products by brand 
app.get('/products/brand=', async(request, response) => {
  products = await db.findProducts({'brand': 'adresse'}, false)
  console.log(products.length)
  response.send({"products" : products});
})



async function main(){
  await connection();
  app.listen(PORT);
  //await request();
  //await db.close();
}

main();