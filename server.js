const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register')
const signin = require('./controllers/signIn')
const addUserdata = require('./controllers/adduserdata')
const showUserdata = require('./controllers/showuserdata')


const db = knex({
  client: 'mysql',        // Using mySql as client
  connection: {
    host : '127.0.0.1',
    user : 'shubham',
    password : 'shubham2',
    database : 'passtracker'
  }
});

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/',(req,res)=>{res.send("Hello,Its working Shubham")})

app.post('/signIn', (req,res) => {signin.handlesignIn(req,res,bcrypt,db)})

app.post('/Register' , (req,res) => {register.handleRegister(req,res,bcrypt,db)})

app.post('/Storeuserdata' , (req,res) => {addUserdata.handleStore(req,res,bcrypt,db)})

app.post('/Showuserdata' , (req,res) => {showUserdata.handleShow(req,res,db)})

app.listen(3000)