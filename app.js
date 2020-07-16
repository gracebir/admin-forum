const express = require('express');
const app = express()
const expressLayout = require('express-ejs-layouts');
const ejs = require('ejs');
const expressfile = require('express-fileupload');

//import routers
const router = require('./routers/index');


// middlewares
app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.use(expressLayout);
app.use(expressfile())
app.set('view engine','ejs');
app.use('/',router);


const port = process.env.PORT || 5500;

app.listen(port,()=> console.log(`listen on port ${port}...`));

