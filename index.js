const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const bankRoutes = require('./routes/router')
const apiRoutes = require('./routes/api')

const PORT = process.env.PORT || 3000
const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'script')))
app.use(express.json({
  type: ['application/json', 'text/plain']
}))

app.use(bankRoutes)
app.use(apiRoutes)

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://sania:klapan@cluster0.felry.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useFindAndModify: false
      }
    )
    app.listen(PORT, () => {
      console.log('Server has been started...')
    })
  } catch (e) {
    console.log(e)
  }
}

start()
