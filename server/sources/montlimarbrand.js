const fetch = require('node-fetch');
const cheerio = require('cheerio');


/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
 const parse = data => {
    const $ = cheerio.load(data);
  
    return $('.category-products .item')
      .map((i, element) => {
        const brand = "montlimart";
        //console.log(element)
        // name = "blabla";
        const name = $(element)
          .find('.product-name')
          .text()
          .trim()
          .replace(/\s/g, ' ');
        // console.log($(element).find('.product-name').children().text().trim().replace(/\s/g, ' '));
        const price = parseInt(
          $(element)
            .find('.price')
            .text()
        );

        const link = $(element)
        .find('.product-name')
        .children()
        .attr('href');
        var photo = $(element)
        .find('.product-image')
        .children()
        .children()
        .attr('src');

        if(photo !== undefined) photo = photo.toString().replace(' ', '%20');
  
        return {brand, name, price, link, photo};
      })
      .get();
  };




/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
 module.exports.scrape = async url => {
    try {
      const response = await fetch(url);
  
      if (response.ok) {
        const body = await response.text();
  
        return parse(body);
      }
  
      console.error(response);
  
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  