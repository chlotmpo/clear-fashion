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

// Products by id
// app.get('/products/:_id', async(request, response) => {
//   products = await db.findProducts({'_id': new ObjectId(request.params._id)}, false)
//   response.send({"count" : products.length, "products" : products});
// })


// Product search, Search for specific product 
app.get('/products/search', async(request, response) => {
  products = await db.findAllProducts(false)
  const filters = request.query;
  const filteredProducts = await products.filter(product => {
    let isValid = true;
    for (key in filters) {
      console.log(key, product[key], filters[key]);
      isValid = isValid && product[key] == filters[key];
    }
    return isValid;
  });
  console.log('filteredProducts.length :>> ', filteredProducts.length);
  response.send(filteredProducts);
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