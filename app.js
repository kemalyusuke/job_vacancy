const express = require('express')
const app = express()
const router = require('./routes')
const session = require('express-session')

const port = process.env.PORT || 3000

app.use(session({
  secret: 'ppsolokemal',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}))

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended:true }))

app.use(router)

app.listen(port, ()=>{
  console.log(`app is running on port $`)
})

