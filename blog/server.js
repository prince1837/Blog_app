const mysql=require("mysql")
const express=require("express")
const jwt=require("jsonwebtoken")
const dotenv=require('dotenv').config()
const S_key=process.env.Sec_key

var app=express()
app.use(express.json())

const knex = require('knex')({
	client: 'mysql',
	connection: {
	  host : process.env.DB_HOST,
	  user : process.env.DB_USER,
	  password : process.env.DB_PASSWORD,
	  database : process.env.DB_DATABASE
	}
  });

require("./routes/create_table")(knex)

const login=express.Router()
app.use("/",login)
require("./routes/login")(login,knex,jwt,S_key)

const sign_up=express.Router()
app.use("/",sign_up)
require("./routes/sign_up")(sign_up,knex,jwt,S_key)

const post=express.Router()
app.use("/",post)
require("./routes/create_post")(post,knex,jwt,S_key)


  app.listen(process.env.DB_PORT,()=>{
	console.log("your server is started...... ");
})