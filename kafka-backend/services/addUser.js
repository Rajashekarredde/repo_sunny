const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const constants = require("../config.json");
const mysql = require("mysql");

const db = mysql.createConnection({
  host: constants.development.host,
  user: constants.development.username,
  password: constants.development.password,
  port: constants.development.port,
  database: constants.development.database,
});

async function handle_request(msg, callback) {
  console.log("In register post");

  console.log("In register post");

  console.log(msg.username + " --------------- ");
  if (!msg) 
  {
    callback(null, { message: "Content can not be empty" });
    return;
  }

  db.query(
    "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)",
    [msg.username, msg.email, msg.password],
    (err, result) =>
    {
      if (err) 
      {
        callback(null, { status: 200, response: {} });
      }
      else
      {
        callback(null,{ success: true, result });
      }

    }
  );
}

exports.handle_request = handle_request;
