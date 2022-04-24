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

  console.log("In user purchase post request ");

  if (!msg) 
  {
    callback(null, { message: "Content can not be empty" });
    return;
  }

  db.query(
    "INSERT INTO Purchases (itemOrderId, userId, itemId, itemName, itemImage, itemQty, itemDescription, itemPrice, itemCount, itemOrderMsg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      msg.itemOrderId,
      msg.id,
      msg.itemId,
      msg.itemName,
      msg.itemImage,
      msg.itemQuantity,
      msg.itemDescription,
      msg.itemPrice,
      msg.itemCount,
      msg.itemOrderMsg,
    ],(err, result) =>{
      if (err) 
     {
        console.log(err);
        callback(null,{ message: "error" });
      }
      else
      {
        callback(null, { message: "success" });
      }
    }
  );


}

exports.handle_request = handle_request;
