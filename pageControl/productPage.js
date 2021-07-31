const baseURL = "https://www.amazon.com";
const checkURL = "https://www.amazon.com/dp/";
const shipFrom = "//table[@id='tabular-buybox-container']/tbody/tr[1]/td[@class='tabular-buybox-column']" +
    "/span/span[@class='a-truncate-cut']/span[@class='tabular-buybox-text']";
const locationPath = "nav-global-location-popover-link";
const selectCountry = "//span[@id='GLUXCountryListDropdown']//span[@role='radiogroup']";
const selectCanada = "//li[47]";
const approveCountrySelect = "//button[@name='glowDoneButton']";
const quantityCount = "//select[@id='quantity']/option";
const reviewRate = [
    "span#acrPopover .a-icon.a-icon-star.a-star-5",
    "span#acrPopover .a-icon.a-icon-star.a-star-4-5"
];
const reviewCount = "acrCustomerReviewText";

module.exports ={
    baseURL,
    checkURL,
    shipFrom,
    locationPath,
    selectCountry,
    selectCanada,
    approveCountrySelect,
    quantityCount,
    reviewRate,
    reviewCount
}