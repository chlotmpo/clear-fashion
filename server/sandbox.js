
/* eslint-disable no-console, no-process-exit */
//const dedicatedbrand = require('./sources/dedicatedbrand');
const adresseParis = require('./sources/adresseparisbrand');
const montlimart = require('./sources/montlimarbrand');

const fetch = require("node-fetch");
const fs = require('fs');

//https://adresse.paris/630-toute-la-collection
//https://www.dedicatedbrand.com/en/loadfilter?category=men%2Fnews
//https://www.montlimart.com/toute-la-collection.html

async function sandbox (eshop = 'montlimart') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    var products = [];
    var json_content = [];
    switch (eshop){
      case "montlimart":
        for (let i = 0; i < 8; i++){
          const prod = await montlimart.scrape('https://www.montlimart.com/toute-la-collection.html?p=' + (i+1));
          products = products.concat(prod);
        }
        json_content = JSON.stringify(products, null, 2);
        fs.writeFileSync('sites/montlimart_products.json', json_content);   
        break;
      case 'dedicated':
        const result = await fetch('https://www.dedicatedbrand.com/en/loadfilter?category=men%2Fall-men');
        const content   = await result.json();

        content.products.forEach(element => {
          if(element.length === undefined){
            products.push(
              {
                brand : "dedicated",
                name : element.name,
                price : element.price.priceAsNumber,
                link : `https://www.dedicatedbrand.com/en/` + element.cannicalUri,
                photo : element.image[0]
              }
            )
          }
        })
        //products = content.products;
        json_content = JSON.stringify(products, null, 2);
        fs.writeFileSync('sites/dedicated_products.json', json_content);  
        break;
      case 'adresse':
        const product1 = await adresseParis.scrape("https://adresse.paris/630-toute-la-collection");
        //console.log(product1);
        const product2 = await adresseParis.scrape("https://adresse.paris/630-toute-la-collection?p=2")
        products = product1.concat(product2);
        json_content = JSON.stringify(products, null, 2);
        fs.writeFileSync('sites/adresse_products.json', json_content);
        break;
    }

    console.log(products);
    console.log(products.length);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}




const [,, eshop] = process.argv;

sandbox(eshop);



