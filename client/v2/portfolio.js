// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};
let currentBrand = "";
let ReasonableChecked = false;
let RecentlyChecked = false;
let kindOfSort = "";

// inititiate selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const spanNbProductsDisplayed = document.querySelector('#nbProductsDisplayed');
const spanNbNewProducts = document.querySelector('#nbNewProducts');
const selectBrand = document.querySelector('#brand-select');
const selectReasonable = document.querySelector('#reasonable-price');
const selectRecentlyReleased = document.querySelector('#recently-released');
const selectSort = document.querySelector('#sort-select');



/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};



/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
  spanNbProductsDisplayed.innerHTML = currentProducts.length;
  spanNbNewProducts.innerHTML = currentProducts.filter(product => new_product(product)).length;
};

/**
 * Render brand selector
 * @param  {Object} products
 */
 const renderBrands = products => {
  const brands = []; // distinct list of brands 
  const options = products.map(product => {
    // if the brand doesn't exist in the list of brands
    if(!brands.includes(product.brand)){
      brands.push(product.brand);
      return `<option value="${product.brand}" ${currentBrand === product.brand ? "selected" : ""}>${product.brand}</option>`;
    }
  });

  options.unshift(`<option value="">All brands</option>`);

  selectBrand.innerHTML = options.join('');
  if(currentBrand === ""){
    selectBrand.selectedIndex = 0;
  }
};

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
  renderBrands(products);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * @type {[type]}
 */
 selectShow.addEventListener('change', event => {
  currentPagination.pageSize = parseInt(event.target.value);
  fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
  .then(setCurrentProducts)
  .then(() => { 
    if(currentBrand !== ""){
      currentProducts = currentProducts.filter(product => product.brand === currentBrand);
    }
    if(RecentlyChecked){
      currentProducts = currentProducts.filter(product => new_product(product))
    }
    if(ReasonableChecked){
      currentProducts = currentProducts.filter(product => reasonable_price(product));
    }
    if(kindOfSort !== "no-sort"){
      if(kindOfSort === "price-asc") currentProducts = currentProducts.sort( (e1, e2) => { return e1.price >  e2.price});
      else if(kindOfSort === "price-desc") currentProducts = currentProducts.sort( (e1, e2) => { return e1.price <  e2.price});
      else if(kindOfSort === "date-asc")  currentProducts = currentProducts.sort( (e1, e2) => { return new Date(e1.released).getTime() > new Date(e2.released).getTime()})
      else if(kindOfSort === "date-desc")  currentProducts = currentProducts.sort( (e1, e2) => { return new Date(e1.released).getTime() < new Date(e2.released).getTime()})
    }
      render(currentProducts, currentPagination);
  })
});

selectPage.addEventListener('change', event => {
  console.log(RecentlyChecked);
  currentPagination.currentPage = parseInt(event.target.value);
  fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
  .then(setCurrentProducts)
  .then(() => { 
    if(currentBrand !== ""){
      currentProducts = currentProducts.filter(product => product.brand === currentBrand);
    }
    if(RecentlyChecked){
      currentProducts = currentProducts.filter(product => new_product(product))
    }
    if(ReasonableChecked){
      currentProducts = currentProducts.filter(product => reasonable_price(product));
    }
    if(kindOfSort !== "no-sort"){
      if(kindOfSort === "price-asc") currentProducts = currentProducts.sort( (e1, e2) => { return e1.price >  e2.price});
      else if(kindOfSort === "price-desc") currentProducts = currentProducts.sort( (e1, e2) => { return e1.price <  e2.price});
      else if(kindOfSort === "date-asc")  currentProducts = currentProducts.sort( (e1, e2) => { return new Date(e1.released).getTime() > new Date(e2.released).getTime()})
      else if(kindOfSort === "date-desc")  currentProducts = currentProducts.sort( (e1, e2) => { return new Date(e1.released).getTime() < new Date(e2.released).getTime()})
    }
      render(currentProducts, currentPagination);
  })
});

document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
);


selectBrand.addEventListener('change', event => {
  currentBrand = event.target.value;
    fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
    .then(setCurrentProducts)
    .then(() => { 
      if(currentBrand !== ""){
        currentProducts = currentProducts.filter(product => product.brand === currentBrand);
      }
      if(RecentlyChecked){
        currentProducts = currentProducts.filter(product => new_product(product))
      }
      if(ReasonableChecked){
        currentProducts = currentProducts.filter(product => reasonable_price(product));
      }
      if(kindOfSort !== "no-sort"){
        if(kindOfSort === "price-asc") currentProducts = currentProducts.sort( (e1, e2) => { return e1.price >  e2.price});
        else if(kindOfSort === "price-desc") currentProducts = currentProducts.sort( (e1, e2) => { return e1.price <  e2.price});
        else if(kindOfSort === "date-asc")  currentProducts = currentProducts.sort( (e1, e2) => { return new Date(e1.released).getTime() > new Date(e2.released).getTime()})
        else if(kindOfSort === "date-desc")  currentProducts = currentProducts.sort( (e1, e2) => { return new Date(e1.released).getTime() < new Date(e2.released).getTime()})
      }
        render(currentProducts, currentPagination);
    })
});

selectReasonable.addEventListener('change', event => {
  ReasonableChecked = selectReasonable.checked;
  fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
  .then(setCurrentProducts)
  .then(() => { 
    if(currentBrand !== ""){
      currentProducts = currentProducts.filter(product => product.brand === currentBrand);
    }
    if(RecentlyChecked){
      currentProducts = currentProducts.filter(product => new_product(product));
    }
    if(ReasonableChecked){
      currentProducts = currentProducts.filter(product => reasonable_price(product));
    }
    if(kindOfSort !== "no-sort"){
      if(kindOfSort === "price-asc") currentProducts = currentProducts.sort( (e1, e2) => { return e1.price >  e2.price});
      else if(kindOfSort === "price-desc") currentProducts = currentProducts.sort( (e1, e2) => { return e1.price <  e2.price});
      else if(kindOfSort === "date-asc")  currentProducts = currentProducts.sort( (e1, e2) => { return new Date(e1.released).getTime() > new Date(e2.released).getTime()})
      else if(kindOfSort === "date-desc")  currentProducts = currentProducts.sort( (e1, e2) => { return new Date(e1.released).getTime() < new Date(e2.released).getTime()})
    }
      render(currentProducts, currentPagination);
  })
  
});

selectRecentlyReleased.addEventListener('change', event => {
    RecentlyChecked = selectRecentlyReleased.checked;
    fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
    .then(setCurrentProducts)
    .then(() => { 
      if(currentBrand !== ""){
        currentProducts = currentProducts.filter(product => product.brand === currentBrand);
      }
      if(RecentlyChecked){
        currentProducts = currentProducts.filter(product => new_product(product))
      }
      if(ReasonableChecked){
        currentProducts = currentProducts.filter(product => reasonable_price(product));
      }
      if(kindOfSort !== "no-sort"){
        if(kindOfSort === "price-asc") currentProducts = currentProducts.sort( (e1, e2) => { return e1.price >  e2.price});
        else if(kindOfSort === "price-desc") currentProducts = currentProducts.sort( (e1, e2) => { return e1.price <  e2.price});
        else if(kindOfSort === "date-asc")  currentProducts = currentProducts.sort( (e1, e2) => { return new Date(e1.released).getTime() > new Date(e2.released).getTime()})
        else if(kindOfSort === "date-desc")  currentProducts = currentProducts.sort( (e1, e2) => { return new Date(e1.released).getTime() < new Date(e2.released).getTime()})
      }
        render(currentProducts, currentPagination);
    })
    
});

selectSort.addEventListener('change', event =>{
  kindOfSort = event.target.value;
  console.log(kindOfSort);
  fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
  .then(setCurrentProducts)
  .then(() => { 
    if(currentBrand !== ""){
      currentProducts = currentProducts.filter(product => product.brand === currentBrand);
    }
    if(RecentlyChecked){
      currentProducts = currentProducts.filter(product => new_product(product))
    }
    if(ReasonableChecked){
      currentProducts = currentProducts.filter(product => reasonable_price(product));
    }
    if(kindOfSort !== "no-sort"){
      if(kindOfSort === "price-asc") currentProducts = currentProducts.sort( (e1, e2) => { return e1.price >  e2.price});
      else if(kindOfSort === "price-desc") currentProducts = currentProducts.sort( (e1, e2) => { return e1.price <  e2.price});
      else if(kindOfSort === "date-asc")  currentProducts = currentProducts.sort( (e1, e2) => { return new Date(e1.released).getTime() > new Date(e2.released).getTime()})
      else if(kindOfSort === "date-desc")  currentProducts = currentProducts.sort( (e1, e2) => { return new Date(e1.released).getTime() < new Date(e2.released).getTime()})
    }
      render(currentProducts, currentPagination);
  })
})


/**
 *  Methods needed
 */

 function new_product(product){
  let new_product = false;
  if ((new Date().getTime() - new Date(product.released).getTime() ) / (24*60*60*1000) < 14) {
    new_product = true;
  }
  return new_product;
}

function reasonable_price(product){
  let reasonable = false;
  if(product.price < 50){
    reasonable = true;
  }
  return reasonable;
}
