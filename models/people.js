module.exports = function (sequelize, DataTypes) {
    var People = sequelize.define("People", {
        
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        isVolunteer: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },    
        {
            timestamps: false,
        });
    return People;
};
