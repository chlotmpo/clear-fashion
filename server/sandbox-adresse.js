/* eslint-disable no-console, no-process-exit */
const adressbrand = require('./sources/adresseparisbrand');

async function sandbox (eshop = 'https://adresse.paris/602-nouveautes') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await adressbrand.scrape(eshop);

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);