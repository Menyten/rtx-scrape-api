const {
  KOMPL_PRODUCT_NAME,
  KOMPL_PRODUCT_BUTTON,
  KOMPL_NOT_IN_STOCK,
  KOMPL_PRODUCT_PRICE,
} = require('./selectors/komplett');
const {
  WEBBH_PRODUCT_NAME,
  WEBBH_PRODUCT_BUTTON,
  WEBBH_NOT_IN_STOCK,
  WEBBH_PRODUCT_PRICE,
} = require('./selectors/webbhallen');
const {
  NETONNET_PRODUCT_NAME,
  NETONNET_PRODUCT_BUTTON,
  NETONNET_NOT_IN_STOCK,
  NETONNET_PRODUCT_PRICE,
} = require('./selectors/netonnet');
const {
  INET_PRODUCT_NAME,
  INET_PRODUCT_BUTTON,
  INET_PRODUCT_PRICE,
} = require('./selectors/inet');

const getKomplettProductData = async (page) => {
  return await page.evaluate(
    (name, button, inStock, price) => {
      const productNameElement = getElement(name);
      const productPriceElement = getElement(price);
      const productButtonElement = getElement(button);
      const productName = productNameElement && productNameElement.innerText;
      const productPrice = productPriceElement && productPriceElement.innerText;
      const productButton =
        productButtonElement && productButtonElement.innerText;
      return {
        productName,
        productPrice,
        productInStock: productButton !== inStock,
      };
    },
    KOMPL_PRODUCT_NAME,
    KOMPL_PRODUCT_BUTTON,
    KOMPL_NOT_IN_STOCK,
    KOMPL_PRODUCT_PRICE
  );
};

const getWebbhallenData = async (page) => {
  return await page.evaluate(
    (name, button, inStock, price) => {
      const productNameElement = getElement(name);
      const productButtonElement = getElement(button);
      const productPriceElement = getElement(price);
      const productName = productNameElement && productNameElement.innerText;
      const productPrice = productPriceElement && productPriceElement.innerText;
      const productButton =
        productButtonElement && productButtonElement.innerText;
      return {
        productName,
        productPrice,
        productInStock: productButton !== inStock,
      };
    },
    WEBBH_PRODUCT_NAME,
    WEBBH_PRODUCT_BUTTON,
    WEBBH_NOT_IN_STOCK,
    WEBBH_PRODUCT_PRICE
  );
};

const getNetOnNetData = async (page) => {
  return await page.evaluate(
    (name, button, inStock, price) => {
      const productNameElement = getElement(name);
      const productPriceElement = getElement(price);
      const productButtonElement = getElement(button);
      const productName = productNameElement && productNameElement.innerText;
      const productPrice = productPriceElement && productPriceElement.innerText;
      const productButton =
        productButtonElement && productButtonElement.innerText;
      return {
        productName,
        productPrice,
        productInStock: productButton !== inStock,
      };
    },
    NETONNET_PRODUCT_NAME,
    NETONNET_PRODUCT_BUTTON,
    NETONNET_NOT_IN_STOCK,
    NETONNET_PRODUCT_PRICE
  );
};

const getInetData = async (page) => {
  return await page.evaluate(
    (name, button, price) => {
      const productNameElement = getElement(name);
      const productPriceElement = getElement(price);
      const productInStock = !getElement(button).classList.contains('disabled');
      const productName = productNameElement && productNameElement.innerText;
      const productPrice = productPriceElement && productPriceElement.innerText;
      return {
        productName,
        productPrice,
        productInStock,
      };
    },
    INET_PRODUCT_NAME,
    INET_PRODUCT_BUTTON,
    INET_PRODUCT_PRICE
  );
};

module.exports = {
  getKomplettProductData,
  getNetOnNetData,
  getInetData,
  getWebbhallenData,
};
