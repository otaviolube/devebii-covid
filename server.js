const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000;
const MainRouter = require('./routes/main');
const PacientesRouter = require('./routes/pacientes');
const HospitaisRouter = require('./routes/hospitais');

const db = require('./database/db');
db.sequelize.sync({force: false});

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/", MainRouter);
app.use("/pacientes", PacientesRouter);
app.use("/hospitais", HospitaisRouter);


app.listen(port, function(){
    console.log('O servidor está rodando na porta ' + port);
})