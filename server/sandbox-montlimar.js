/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/montlimarbrand');

async function sandbox (eshop = 'https://www.montlimart.com/pulls-sweats.html') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await dedicatedbrand.scrape(eshop);

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
