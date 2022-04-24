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

  console.log("In user favourite post request ");

  if (!msg) 
  {
    callback(null, { message: "Content can not be empty" });
    return;
  }

  db.query(
    "INSERT INTO Favourites (itemId, userId) VALUES (?, ?)",
    [msg.itemId, msg.userId],
    (err, result) =>
    {
      if (err)
      {
        console.log(err);
        res.send(err);
        callback(null, err);
      }
      else
      {
        callback(null,{ success: true, result });
      }
    }
  );

}

exports.handle_request = handle_request;
