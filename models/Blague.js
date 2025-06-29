module.exports = (sequelize, DataTypes) => {
    const Blague = sequelize.define('Blague', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        question: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [5, 500]
            }
        },
        reponse: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 500]
            }
        }
    }, {
        tableName: 'blagues',
        timestamps: true
    });

    return Blague;
};