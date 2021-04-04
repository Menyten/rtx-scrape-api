const getKomplettProductData = async (page) => {
  return await page.evaluate(() => {
    const productName = document.querySelector('.product-main-info-webtext1')
      .innerText;
    const productImage = document.querySelector('.swiper-slide > img').src;
    const productButton = document.querySelector('.monitor-button').innerText;
    const NOT_IN_STOCK = 'MEDDELA MIG';
    return {
      productName,
      productImage,
      productInStock: productButton !== NOT_IN_STOCK,
    };
  });
};

const getWebbhallenData = async (page) => {
  return await page.evaluate(() => {
    const productName = document.querySelector('h1').innerText;
    const productImage = document
      .querySelector('.gallery .ximg-content')
      .style.backgroundImage.replace('url("//', 'https://')
      .replace('")', '');
    const productButton = document.querySelector('#add-product-to-cart button')
      .innerText;
    const NOT_IN_STOCK = 'Meddela mig';
    return {
      productName,
      productImage,
      productInStock: productButton !== NOT_IN_STOCK,
    };
  });
};

const getNetOnNetData = async (page) => {
  return await page.evaluate(() => {
    const productName = document.querySelector('h2').innerText;
    const productImage = document.querySelector('.productImage').src;
    const productButton = document.querySelector(
      '#productPurchaseBoxContainer button'
    ).innerText;
    const NOT_IN_STOCK = 'Bevaka produkt';
    return {
      productName,
      productImage,
      productInStock: productButton !== NOT_IN_STOCK,
    };
  });
};

const getInetData = async (page) => {
  return await page.evaluate(() => {
    const productName = document.querySelector('header > h1').innerText;
    const productImage = document.querySelector('.center-image img').src;
    const productOutOfStock = !document
      .querySelector('section.box.product-purchase > div > button')
      .classList.contains('disabled');
    return {
      productName,
      productImage,
      productInStock: productOutOfStock,
    };
  });
};

module.exports = {
  getKomplettProductData,
  getNetOnNetData,
  getInetData,
  getWebbhallenData,
};
