const mongoose = require('mongoose')

const db = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .catch((err) => {
      console.error('error: ' + err.stack)
      process.exit(1)
    })
  mongoose.connection.on('open', () => {
    console.log('connected to database')
  })
}

mongoose.Promise = global.Promise

module.exports = db
