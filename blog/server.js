const express = require("express");
const body = require("body-parser");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const app = express();
app.use(body.json())
const s_key = process.env.secret_key;

const knex = require("knex")({
    client: process.env.client,
    connection: {
        user: process.env.user,
        password: process.env.password,
        host: process.env.host,
        database: process.env.database,
    }
})

require("./routes/create_table")(knex)

app.use('/', register = express.Router())
require('./routes/resiter')(register, knex,s_key)

app.use('/login', login = express.Router())
require('./routes/login')(login, knex, jwt,s_key)

app.use('/', post = express.Router())
require('./routes/post')(post, knex, jwt,s_key)

app.use('/', like_dislike = express.Router())
require('./routes/like_dislike')(like_dislike, knex, jwt,s_key)

app.listen(process.env.port, () => {
    console.log(`yuor port is working ${process.env.port}`);
})