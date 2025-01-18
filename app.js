const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const db = require('./config/mongoose-connection');
const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const userRouter = require('./routes/usersRouter');
const indexRouter = require('./routes/index')
require('dotenv').config();
const expressSession = require('express-session')
const flash = require('connect-flash')

const app= express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(
    expressSession({
    secret: 'keyboard=cat',
    resave: false,
    saveUninitialized: false,
}));


app.use(flash());
app.use(express.static(path.join(__dirname,"public")));
app.set('view engine','ejs');

app.use("/", indexRouter)
app.use("/owners", ownersRouter);
app.use("/users", userRouter);
app.use("/product", productsRouter);



app.listen(3000);