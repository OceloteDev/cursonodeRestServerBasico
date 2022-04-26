
const { response, request  } = require('express');


const usuariosGet = (req = request , res = response) => {

    const { nombre, apikey } = req.query; 
    res.json({
        msg: 'get API - Controlador',
        nombre,
        apikey
    });
}

const usuariosPost = (req, res = response) => {

    const body = req.body; 


    res.json({
        msg: 'post API - Controlador',
        body
    });
}

const usuariosPut = (req, res = response) => {
    const body = req.body; 

    const { id } = req.params;


    res.json({
        msg: 'put API - Controlador',
        body,
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controlador'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - Controlador'
    });
}

module.exports = {

    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}