/* eslint-disable no-console */
// import modules
const express = require("express"); // express is class so create a object app to serve.
const mongoose = require("mongoose");
const cors = require("cors");
require("colors"); // colors is for change color for console.log
require("dotenv").config();
const cookieParser = require("cookie-parser");  // just for parseing coookie sent with client requests
const expressValidator = require("express-validator");// for data validation
const {urlencoded,json} = require("express");// middleware for parsing

// app
const app = express(); // app obj created

// database
mongoose.connect("mongodb://localhost:27017/ecommerce").then(() => {
  console.log("Mongodb connected".bgBlue);
});

// middleware
app.use(cors({ origin: true, credentials: true }));
app.use(json());
app.use(urlencoded({extended: false}));   // need json,url,cookie etc  to get data from client
app.use(cookieParser());
app.use(expressValidator());



// routes

// const testRouters = require("./routes/test"); // test routes in testrouter
// app.use("/", testRouters);
const userRouters = require("./routes/userRoute");

app.use('/',userRouters)


// ports
const port = process.env.PORT || 9000;
// listner

// eslint-disable-next-line no-unused-vars
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`.bgWhite);
});
