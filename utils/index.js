const setUpUtilitiesInEvaluate = async (page) =>
  await page.evaluate(() => {
    window.getElement = (element) => document.querySelector(element);
  });

module.exports = setUpUtilitiesInEvaluate;
