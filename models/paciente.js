const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Paciente = sequelize.define(
        'paciente',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            data_internacao: {
                type: Sequelize.DATE
            }
        },
        {
            timestamps: false
        }
    )
    return Paciente;
}