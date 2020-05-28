const Sequelize = require('sequelize');

const db = {}

const sequelizeDB = new Sequelize('app_development', 'root', 'faesa123', {
    hostname: 'localhost',
    port: 3336,
    dialect:'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

db.sequelize = sequelizeDB;
db.Sequelize = Sequelize;

db.pacientes = require('../models/paciente')(sequelizeDB, Sequelize);
db.hospitais = require('../models/hospitais')(sequelizeDB, Sequelize);

module.exports = db;