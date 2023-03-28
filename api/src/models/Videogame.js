const { DataTypes } = require('sequelize');
// Exports a function that defines the model for Videogame
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // Defines the model:
  sequelize.define('videogame', {
    id: { //COMPLETE
      // Use UUID - Diferenciar entre ambas BDD...
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
    description: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    released:{ 
      type: DataTypes.STRING,
      allowNull: false,
    },
    platforms:{ 
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating:{
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max:5
      },
      allowNull: false,
    },
    createdInDb: { // to validate if it already exists in DB
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },

  }, {timestamps: true} );
};
