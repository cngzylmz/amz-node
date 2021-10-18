const { By, until } = require('selenium-webdriver')

const {
  quantityCount,
  checkURL,
  shipFrom,
  reviewCount,
  reviewRate,
  locationPath,
  selectCountry,
  selectCanada,
  approveCountrySelect,
  baseURL,
} = require('../pageControl/productPage')

module.exports = {
  quantityCheck,
  shippingAddressCheck,
  reviewCheck,
  countrySelect,
}

async function quantityCheck(driver) {
  console.log('quantityCheck')
  try {
    let quantity = await driver.findElements(By.xpath(quantityCount))
    return quantity.length
  } catch (err) {
    console.log('quantity check error: ')
    return err
  }
}

async function shippingAddressCheck(driver, assignNumber) {
  console.log('shippingAddressCheck')
  await driver.get(checkURL + assignNumber)
  try {
    let shippingFrom = await driver.findElement(By.xpath(shipFrom))
    if (await shippingFrom.isDisplayed()) {
      let from = await shippingFrom.getText()
      if (from === 'Amazon' || from === 'Amazon.com') {
        return true
      }
    }
  } catch (err) {
    console.log(assignNumber + ' shipping address check error : ' + err)
    return false
  }
}

async function reviewCheck(driver) {
  console.log('reviewCheck')
  let reviewCountCheck = false
  let reviewStarCheck = false
  try {
    let reviewText = await driver.findElement(By.id(reviewCount)).getText()
    if (reviewText) {
      let reviewC = reviewText.match(/\d+/)[0]
      if (reviewC > 10) reviewCountCheck = true
    }
  } catch (err) {
    console.log('review count check error: ' + err)
    return err
  }

  try {
    const reviewRateElement = await driver.findElement(By.xpath(reviewRate))
    reviewStarCheck = [
      'a-icon a-icon-star a-star-5',
      'a-icon a-icon-star a-star-4-5',
    ].includes(await reviewRateElement.getAttribute('class'))
  } catch (err) {
    console.log('review rate check Error : ' + err)
  }
  return reviewCountCheck && reviewStarCheck
}

async function countrySelect(driver) {
  console.log('countrySelect')
  driver.get(baseURL)
  try {
    let locationPathElement = await driver.findElement(By.id(locationPath))
    const firstStep = await driver.wait(
      until.elementIsVisible(locationPathElement),
      10000
    ).isDisplayed
    console.log(firstStep)
    if (firstStep) {
      await driver.findElement(By.id(locationPath)).click()
      await driver.findElement(By.id(selectCountry)).click()
      await driver.findElement(By.id(selectCanada)).click()
      await driver.findElement(By.xpath(approveCountrySelect)).click()
      return true
    }
    return false
  } catch (err) {
    console.log('country select error : ' + err)
    return false
  }
}
