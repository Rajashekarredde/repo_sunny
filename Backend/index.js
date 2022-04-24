const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
var kafka = require("./kafka/client");
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(express.json());

app.use(
  session({
    key: "email",
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    // duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
    cookie: {
      expiresIn: 60 * 60 * 24,
    },
  })
);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.post("/register", function (req, res) {
  console.log(req.body + " IN USER REGISTER POST");
  console.log(req.body + " ----------------------------------");
  console.log(req.body.email + " ----------------------------------");
  console.log(req.body.username + " ----------------------------------");
  console.log("in result");

  kafka.make_request("addUser", req.body, function (err, results) {
    console.log(req.body + " ----------------------------------");
    console.log(req.body.email + " ----------------------------------");
    console.log(req.body.username + " ----------------------------------");
    console.log("in result");

    if (err) {
      console.log(err);
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside Register Response");
      console.log(results);
      res.send({ success: true, results });
      //res.end();
    }
  });
});

app.post("/addFavourite", (req, res) =>{

  kafka.make_request("addUserFavourite", req.body, function (err, results) 
  {
    if (err)
    {
      console.log(err);
      console.log("Inside err");
     
    }
    else
    {
      console.log("------ Inside User Favourite Response ----------");
      console.log(results);
      res.send({ success: true, results });
    }

    res.end();

  });

});


app.post("/storePurchaseItems/", async (req, res) => {
  
  kafka.make_request("addUserPurchase", req.body, function (err, results) 
  {
    if (err)
    {
      console.log("Inside err");
      console.log(err);
    }
    else
    {
      console.log("------ Inside User Purchase Response ----------");
      console.log(results);
      res.send({ message: "success" });
    }

    res.end();

  });

});

//start your server on port 3001
app.listen(4001);
console.log("Server Listening on port 4001");
