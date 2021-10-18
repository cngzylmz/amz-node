const baseURL = 'https://www.amazon.com'
const checkURL = 'https://www.amazon.com/dp/'
const shipFrom =
  "//table[@id='tabular-buybox-container']/tbody/tr[1]/td[@class='tabular-buybox-column']/span/span[@class='a-truncate-cut']/span[@class='tabular-buybox-text']"

const locationPath = 'nav-global-location-popover-link'
const selectCountry = 'GLUXCountryValue'
const selectCanada = 'GLUXCountryList_45'
const approveCountrySelect = "//button[@name='glowDoneButton']"
const quantityCount = "//select[@id='quantity']/option"
const reviewRate = "//*[@id=\"acrPopover\"]/span[1]/a/i[1]"
const reviewCount = 'acrCustomerReviewText'

module.exports = {
  baseURL,
  checkURL,
  shipFrom,
  locationPath,
  selectCountry,
  selectCanada,
  approveCountrySelect,
  quantityCount,
  reviewRate,
  reviewCount,
}
