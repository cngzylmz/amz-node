const { Builder, By, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const fs = require('fs')
const path = require('path')
const sendMail = require('../services/mailService')
const ApprovedAssignsSchema = require('../db/schemas/approvedAssignsSchema')

const {
  quantityCheck,
  shippingAddressCheck,
  reviewCheck,
  countrySelect,
} = require('../helper/assignSearchHelper')

let date = Date.now()

const checkAssign = async (req, res) => {
  let approvedAssigns = []
  const assignNumbers = req.body.assigns

  if (!req.body.mailTo) return res.status(400).json('NO_MAIL')
  if (req.body.assigns.length < 2) return res.status(202).json('ADD_ASSIGNS')
  if (req.body.stockCount < 5) return res.status(202).json('LOW_STOCK')
  try {
    let driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome.Options().headless())
      .build()
    console.log('driver started')
    try {
      if (await countrySelect(driver)) {
        for (let i = 0; i < assignNumbers.length; i++) {
          if (
            (await quantityCheck(driver)) > req.body.stockCount &&
            (await reviewCheck(driver)) &&
            (await shippingAddressCheck(driver, assignNumbers[i]))
          )
            approvedAssigns.push(assignNumbers[i])
        }
      }
      driver.close()
    } catch (err) {
      driver.close()
      console.log('country select error : ' + err)
      return res.status(500).json(err.message)
    }

    if (approvedAssigns.length > 0) {
      console.log('save file')
      let fileName = req.body.mailTo + '-' + date + '.txt'
      await fs.writeFile(
        `${path.resolve('outputs')}/${fileName}`,
        approvedAssigns.toString(),
        function (err) {
          if (err) {
            console.log('Write file error : ' + err)
            throw err
          }
        }
      )
      const data = {
        approvedAssigns: approvedAssigns,
        outputFileName: fileName,
      }
      sendMail.sendApprovedMail(req.body.mailTo, fileName)
      return await res.status(200).json(data)
    } else if (approvedAssigns.length === 0) {
      sendMail.sendNoAssignMail(req.body.mailTo)
      console.log('NO_APPROVED_ASSIGN')
      return res.status(204).json('NO_APPROVED_ASSIGN')
    } else {
      console.log('BAD_REQUEST')
      return res.status(500).json('BAD_REQUEST')
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
}

module.exports = checkAssign
