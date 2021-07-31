const {Builder, By} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require("fs");
const path = require("path");
const sendMail = require("../services/mailService");
const ApprovedAssignsSchema = require('../db/schemas/approvedAssignsSchema')
const {
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
} = require('./productPage')

let date = Date.now();

const checkAssign = async (req, res) => {
    let approvedAssigns = [];
    const assignNumbers = req.body.assign;

    console.log(req.body)
    if (!req.body.mailTo) return res.status(201).json("NO_MAIL")
    if (req.body.assign.length < 2) return res.status(202).json("ADD_ASSIGNS")
    try {
        let driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options().headless())
            .build();
        let tryOpen = false
        console.log("driver started")
        driver.get(baseURL).then(async r => {
            while (tryOpen) {
                try {
                    await driver.findElement(By.id(locationPath)).click();
                    let location = await driver.findElement(By.xpath(selectCountry)).click()
                    let country = await driver.findElement(By.xpath(selectCanada)).click()
                    let locationDone = await driver.findElement(By.xpath(approveCountrySelect)).click()
                    tryOpen = true
                } catch (e) {
                    console.log(e)
                }
            }

            for (let i = 0; i < assignNumbers.length; i++) {
                console.log(assignNumbers[i])
                let assign = await shippingAddressCheck(assignNumbers[i])
                if ((await quantityCheck() > (req.body.stockCount || 10)) && await reviewCheck()) assign ? approvedAssigns.push(assign) : "--"
            }
        })
            .then(r => {
                driver.close().then(async r => {
                    if (approvedAssigns.length > 0) {
                        console.log("save file")
                        let fileName = req.body.mailTo + '-' + date + '.txt'
                        console.log(" filename : " + fileName)
                        console.log("approvedAssign: " + approvedAssigns)
                        await fs.writeFile(`${path.resolve('outputs')}/${fileName}`, approvedAssigns.toString(), function (err) {
                            if (err) throw err
                        })
                        console.log(path.resolve('outputs'))
                        const data = {
                            approvedAssigns: approvedAssigns,
                            outputFileName: fileName,
                        }
                        await res.status(200).json(data)
                        sendMail.sendApprovedMail(req.body.mailTo, path.resolve(''), fileName)

                    } else if (approvedAssigns.length === 0) {
                        sendMail.sendNoAssignMail(req.body.mailTo)
                        console.log("NO_APPROVED_ASSIGN")
                        res.status(203).json("NO_APPROVED_ASSIGN")
                    } else {
                        console.log("BAD_REQUEST")
                        res.status(500).json("BAD_REQUEST")
                    }

                }).catch(err => {
                    driver.close()
                    console.log("driver close error")
                    res.status(400).json({err})
                })
            })
            .catch(err => {
                driver.close()
                res.status(500).json({err})
            })

        async function shippingAddressCheck(assignNumber) {
            await driver.get(checkURL + assignNumber);
            try {
                let shippingFrom = await driver.findElement(By.xpath(shipFrom))
                if (await shippingFrom.isDisplayed()) {
                    let from = await shippingFrom.getText()
                    if (from === 'Amazon' || from === 'Amazon.com') {
                        return assignNumber
                    }
                }
            } catch (err) {
                console.log(assignNumber + " hatalı")
            }
        }

        async function quantityCheck() {
            let quantity = await driver.findElements(By.xpath(quantityCount))
            return quantity.length
        }

        async function reviewCheck() {
            let status = false
            try {
                let reviewText = await driver.findElement(By.css(reviewCount)).getText()
                if (reviewText) {
                    let reviewC = reviewText.match(/\d+/)[0]
                    if (reviewC > 10) status = true
                }
            } catch {
            }

            for (const value of reviewRate) {
                console.log(value)
                try {
                    if (await driver.findElement(By.css(value)).isDisplayed()) status = true
                } catch {

                }
            }
            return status
        }

    } catch (e) {
        console.log(e)
        return
    }

}

module.exports = checkAssign