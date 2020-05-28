const db = require('../database/db');
const Pacientes = db.pacientes;
const Op = db.Sequelize.Op;

exports.cadastrarPaciente = (req, res) => {
    if(!req.body.nome || !req.body.email || !req.body.data_internacao){
        res.status(400).send({
            message: "Dados do paciente não podem ser nulos"
        });
        return;
    }
    const paciente = {
        nome: req.body.nome,
        email: req.body.email,
        data_internacao: req.body.data_internacao
    }
    Pacientes.create(paciente)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro!"
            })
        })
}

exports.selecionarPacientes = (req, res) => {
    const nome = req.body.nome;

    let cond = nome ? { nome: {[Op.like]: `%${nome}%`}} : null;

    Pacientes.findAll({ where: cond })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro ao recuperar os pacientes!"
            })
        })

}

exports.selecionarPacienteID = (req, res) => {
    const id = req.params.id;

    Pacientes.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Ocorreu um erro ao recuperar o paciente de id ${id}`
            })
        })
}

exports.atualizarPaciente = (req, res) => {
    const id = req.params.id;

    Pacientes.update(req.body, { where : { id: id} })
        .then( num_linhas => {
            if(num_linhas == 1){
                res.send({
                    message: "Paciente atualizado com sucesso!"
                })
            }else{
                res.send({
                    message: `Não foi possível encontrar o paciente de id ${id}`
                })
            }
        })
        .catch(err => {
            res.send({
                message: err.message || `Ocorreu um erro ao atualizar o paciente de id ${id}`
            })
        })
}

exports.deletarPaciente = (req, res) => {
    const id = req.params.id;

    Pacientes.destroy({where: {id: id}})
        .then( num_linhas => {
            if(num_linhas == 1){
                res.send({
                    message: "Paciente deletado com sucesso!"
                });
            }else{
                res.send({
                    message: `Não foi possível deletar o paciente de id ${id}`
                })
            }
        })
        .catch(err => {
            res.send({
                message: err.message || `Ocorreu um erro ao deletar o paciente de id ${id}`
            })
        })
}

exports.deletarTodosPacientes = (req, res) => {
    Pacientes.destroy({
        where: {},
        truncate: false
    }).then(num_linhas => {
        res.send({
            message: `${num_linhas} pacientes deletados com sucesso!`
        })
    })
    .catch(err => {
        res.send({
            message: err.message || 'Não foi possível deletar todos os pacientes!'
        })
    })
}