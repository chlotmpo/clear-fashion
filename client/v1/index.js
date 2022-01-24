// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);



/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable


const cheapest_tshirt = "https://www.loom.fr/products/le-t-shirt";
console.log(cheapest_tshirt);


/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable

const number_of_products = marketplace.length;
console.log(number_of_products);


// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have

// With for loops
var brands_name1 = []
for (let i = 0; i < marketplace.length; i++){
  brands_name1.push(marketplace[i].brand);
}
console.log(brands_name1);

// Without for loops
var brands_name2 = marketplace.map(a => a.brand)

// with callback 
marketplace.forEach(function(entry){
  brands_name2.push(entry.band);
})

console.log(brands_name2);
const different_brands_name = Array.from(new Set(brands_name1));
console.log(different_brands_name);

// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable

var marketplace_sort_by_price = marketplace.sort(function(a,b){
  return a.price - b.price;
})
console.log(marketplace_sort_by_price)


// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable

var marketplace_sort_by_date = marketplace.sort(function(a,b){
  if (a.date < b.date){
    return -1;
  }else {
    return 1;
  };
})
console.log(marketplace_sort_by_date)


// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list

const filter_price_product = marketplace.filter(obj => obj.price >= 50 && obj.price <= 100);
console.log(filter_price_product);


// 🎯 TODO: Average price
// 1. Determine the average price of the marketplace
// 2. Log the average

var price_products = marketplace.map(a => a.price);
const average = (array) => array.reduce((a,b) => a + b /array.length);
console.log(average(price_products));



/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands


var brands = {};

different_brands_name.forEach(function(brand_name){
  brands[brand_name] = []
  
  for(let i = 0; i < marketplace.length; i++){

    if(marketplace[i].brand === brand_name) {
    brands[marketplace[i].brand].push({
      'link' : marketplace[i].link,
      'price' : marketplace[i].price,
      'name' : marketplace[i].name,
      'date' : marketplace[i].date
    });
  }
  
  }
});

console.log(brands)

for(var brand in brands){
  console.log('Number of product for the brand ' + brand + " : " + brands[brand].length);
}


// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort

for (var brand in brands){
  brands[brand].sort(function(a,b){
    return a.price - b.price;
  });
}

console.log(brands)


// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort

for (var brand in brands){
  brands[brand].sort(function(a,b){
    if (a.date < b.date){
      return -1;
    }else {
      return 1;
    };
  });
}

console.log(brands);




/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products


function calcQuartile(array,q){
  var a = array.slice();

  // Convert into decimal 
  q = q/100;

  // Work out the position in the array of the percentile point
  var p = ((a.length) - 1) * q;
  var b = Math.floor(p);

  // Work out what we rounded off (if anything)
  var remainder = p - b;

  // See whether that data exists directly
  if (a[b+1]!==undefined){
      return parseFloat(a[b]) + remainder * (parseFloat(a[b+1]) - parseFloat(a[b]));
  }else{
      return parseFloat(a[b]);
  }
}

var p90_values = [];
var price_for_brands = [];

for (const [key, value] of Object.entries(brands)) {
  //console.log(${key}: ${value});

  for (let i = 0; i < value.length; i++){
    price_for_brands.push(value[i].price);
    }

  p90_values.push(calcQuartile(price_for_brands,90));
}

console.log(p90_values)

/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2022-01-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.

function new_product(product){
  let new_product = false;
  if ((new Date().getTime() - new Date(product.released).getTime() ) / (24*60*60*1000) < 14) {
    new_product = true;
  }
  return new_product;
}

//i change a released date in the COTELE_PARIS object to have one new product eligible at the current date
for (let i = 0; i < COTELE_PARIS.length; i++){
  if(new_product(COTELE_PARIS[i]) == true){
    console.log("This is a new product : " + COTELE_PARIS[i].link);
  }
}


// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€

let number_product = COTELE_PARIS.length;
let reasonable_price = 0;

for (let i = 0; i < COTELE_PARIS.length; i++){
  if (COTELE_PARIS[i].price < 100){
    reasonable_price++;
  }
}

if(number_product == reasonable_price){
  console.log("COTELE PARIS is a reasonable shop!");
}
else console.log("COTELE PARIS is not a reasonable shop!");

//other manner with true/false verification 
function reasonable_price_shop(products){
  let reasonable = 0;
  for (let i = 0; i < COTELE_PARIS.length; i++){
    if(COTELE_PARIS[i].price < 100){
      reasonable++;
    }
  }

  return reasonable == COTELE_PARIS.length;
}

console.log(reasonable_price_shop(COTELE_PARIS));


// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product

function find_product_with_uuid(products, uuid){
  let product = {}
  for (let i = 0; i < products.length; i++){
    if(products[i].uuid === uuid){
      product = products[i];
    }
  }
  return product
}

console.log(find_product_with_uuid(COTELE_PARIS,'b56c6d88-749a-5b4c-b571-e5b5c6483131'));


// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product

// console.log("LOG BEFORE DELETION : ");
// console.log(COTELE_PARIS);

function delete_product_by_uuid(uuid, products){
  for (let i = 0; i < products.length; i++){
    if(products[i].uuid === uuid){
      console.log(products[i]);
      products.splice(i,1); //we want to delete only one element at the specified index
      break;
    }
  }
  return products
}

console.log("LOG AFTER DELETION : ");
console.log(delete_product_by_uuid('b56c6d88-749a-5b4c-b571-e5b5c6483131', COTELE_PARIS));

// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;

jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
// 2. What do you notice?

console.log('blueJacket :>> ', blueJacket);
console.log('jacket :>> ', jacket);

// we can notice that the two variables are exactly the same even after adding a new property to jacket. The both have this property now
// it seems that when a 2 variables are copy of each other, if a modification affects one variable, the other will be affect too

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties

jacket = Object.assign({}, blueJacket);
jacket.favorite = true;

console.log('blueJacket :>> ', blueJacket);
console.log('jacket :>> ', jacket);



/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage

localStorage.setItem('MY_FAVORITE_BRANDS', MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS);
