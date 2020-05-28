const express = require('express');
const pacientes = express.Router();
const pacientesController = require('../controllers/pacienteController');
const cors = require('cors');

pacientes.use(cors());

pacientes.get('/:id?', (req, res) => {
    if(req.params.id){
        pacientesController.selecionarPacienteID(req, res);
    }else{
        pacientesController.selecionarPacientes(req, res);
    }
});

pacientes.post('/', (req, res) => {
    console.log(req);
    pacientesController.cadastrarPaciente(req, res);
});

pacientes.patch('/:id', (req, res) => {
    pacientesController.atualizarPaciente(req, res);
});

pacientes.delete('/:id?', (req, res) => {
    if(req.params.id){
        pacientesController.deletarPaciente(req, res);
    }else{
        pacientesController.deletarTodosPacientes(req, res);
    }
});

module.exports = pacientes;