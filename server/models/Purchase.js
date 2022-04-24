module.exports = (sequelize, DataTypes) => {
    const Purchase = sequelize.define("Purchase", {
    itemOrderId: {
        type:  DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
  
      userId: {
        type: DataTypes.INTEGER(11),
        references: {
          model: "Users",
          key: "id",
        },
      },
      itemId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      itemName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      itemImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      itemQty: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      itemDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      itemPrice: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      itemCount: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      itemOrderMsg: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
    return Purchase;
  };
  