const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://chlotmpo:kp2MUB8zZUMtxi9@clearfahsion.poek8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'ClearFashion';

let client
let db
var adresse_products = require('../server/sites/adresse_products.json');
var dedicated_products = require('../server/sites/dedicated_products.json');
var montlimart_products = require('../server/sites/montlimart_products.json');
var products = adresse_products.concat(dedicated_products,montlimart_products);

/**
 * Connection to the db 
 * @param {*} MONGODB_URI 
 * @param {*} MONGODB_DB_NAME 
 */
async function Connect(MONGODB_URI, MONGODB_DB_NAME){
    console.log("⏳ Connection to MongoDB - ClearFashion cluster ...");
    client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    console.log("🎯 Connection Successful");
    db =  client.db(MONGODB_DB_NAME)
}


// async function main () {
//     const client = new MongoClient(MONGODB_URI);
//     try {
//         await client.connect();
//         console.log("Connection to MongoDB - ClearFashion cluster ...");
//     } catch(e) {
//         console.error(e);
//     }
//     finally {
//         await client.close();
//         console.log("Connection successful");
//     }
// }

// main().catch(console.error);

/**
 * Close the connection to the db
 */
async function Close(){
    await client.close();
    console.log("🔐 Connection Closed");
}

/**
 * Insert the products in the db
 */
async function InsertProducts(){
    const collection = db.collection('products');
    const result = await collection.insertMany(products, {'ordered': false});
    console.log("👕 Products successfully loaded in ClearFashion cluster");
}


var brand = ' "$name" : "adresse"';

async function FindProduct(brand){
    const collection = db.collection('products');
    const products_filtered = await collection.find({brand}).toArray();
    console.log("Filtered applied");
    console.log(products_filtered);}

async function main(){
    await Connect(MONGODB_URI, MONGODB_DB_NAME);
    await InsertProducts();
    await FindProduct(brand);
    await Close();
}

main();