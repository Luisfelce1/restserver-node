//crear funciones y exportarlas

const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/Usuario');
const { validationResult } = require('express-validator');

const usuariosGet = async (req = request, res = response) => {

    //const {q, nombre = 'No name', apikey, page, limit} = req.query;
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    //La respuesta es una coleccion de las dos promesas
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async (req, res = response) => {

    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    //TODO validar contra base de datos
    if(password) {
          //Encriptar la contraseña 
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuarioDB = await Usuario.findOneAndUpdate(id, resto);

    res.json(usuarioDB);
}

const usuariosPost = async (req, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //Encriptar la contraseña 
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API - controlador'
    });
}

const usuariosDelete = async (req, res = response) => {

    const {id} = req.params;

    //Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id); NO RECOMENDADO

    const usuario  = await Usuario.findByIdAndUpdate(id, {estado: false});


    res.json(usuario);
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}