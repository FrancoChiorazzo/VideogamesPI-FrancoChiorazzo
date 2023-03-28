const { DataTypes } = require('sequelize');

// Exports a function that defines the model for Genres
module.exports = (sequelize) => {
    return sequelize.define('genre', {
        
        id: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        // Genre Name:
        name: { //COMPLETE
            type: DataTypes.ENUM ("Racing", "Shooter", "Adventure", "Action", "RPG", "Fighting", "Puzzle", "Strategy", "Arcade", "Simulation", "Sports", "Card", "Family", "Board Games", "Educational", "Casual", "Indie", "Massively Multiplayer", "Platformer"),
            allowNull: false,
        },
    },{timestamps : false});
}
