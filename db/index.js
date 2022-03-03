const {MongoClient, ExplainVerbosity} = require('mongodb');
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

/**
 * Find all the products that belong to a given brand
 * @param {name of the searched brand} brand 
 */
async function FindProductBrand(brand){
    const collection = db.collection('products');
    const products_filtered = await collection.find({'brand' : `${brand}`}).toArray();
    console.log("Filtered applied");
    console.log(products_filtered);}

/**
 * Find all the products that cost less than a given price 
 * @param {price limit} price 
 */
async function FindProductLessThan(price){
    const collection = db.collection('products');
    const products_filtered = await collection.find({'price' : {'$lte' : parseInt(price,10)}}).toArray();
    console.log("Filtered applied");
    console.log(products_filtered);
}

/**
 * Return all the products sorted by price
 */
async function FindProductsSortedByPrice(){
    const collection = db.collection('products')
    products = await collection.find().sort({'price' : 1}).toArray();
    products = DropNullElement(products);
    // Still a problem with null elements
    // products_sorted = products.sort( (e1, e2) => { return e1.price >  e2.price});
    console.log('Products sorted');
    console.log(products);
}

/**
 * Drop the null elements of the list of products
 * @param {list of products that we want review} products 
 * @returns 
 */
function DropNullElement(products){
    for(let i = 0; i < products.length; i++){
        if (products[i].price === null) products.splice(i,1);
    }
    return products
}
/**
 * Main function
 */
async function main(){
    await Connect(MONGODB_URI, MONGODB_DB_NAME);
    db.collection('products').drop(); // to avoid duplicated data anytime this function is executed
    await InsertProducts();
    //await FindProductBrand('adresse');
    await FindProductLessThan(25);
    //await FindProductsSortedByPrice();
    await Close();
}

main();