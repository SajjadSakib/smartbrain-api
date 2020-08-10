const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');
const profileHandler= require('./handlers/profileHandler').profileHandler
const signinHandler= require('./handlers/signinHandler').signinHandler
const registerHandler= require('./handlers/registerHandler').registerHandler
const imageHandler= require('./handlers/imageHandler').imageHandler
const imageUrl= require('./handlers/imageHandler').imageUrl

const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'saju',
    database : 'smartbrain'
  }
});



const app = express();
app.use(bodyParser.json());
app.use(cors())


app.get('/profile/:id',(req,res)=>{profileHandler(req,res,db)})
app.post('/signin',(req,res)=>{signinHandler(req,res,db,bcrypt)})
app.post('/register',(req,res)=>{registerHandler(req,res,db,bcrypt)})
app.post('/image',(req,res)=>{imageHandler(req,res,db)})
app.post('/imageurl',(req,res)=>{imageUrl(req,res)})

app.listen(3001,()=>{
	console.log('Server is listenning')
})


