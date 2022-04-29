
const { response, request  } = require('express');



const Usuario = require('../models/usuario');

const bcriptjs = require('bcryptjs');





const usuariosGet =   async(req = request , res = response) => {

    const {limite = 5, desde = 0 } = req.query;

    const query = {estado:true};



    const [usuarios, total] = await Promise.all([

        Usuario.find( query )
               .skip( Number( desde ) )
               .limit(Number(limite)),
        Usuario.countDocuments( query )
        
    ]);

    res.json({
        msg: 'get API - Controlador',
        total,
        usuarios
    
    });
}

const usuariosPost = async (req, res = response) => {

    

    const {nombre, correo, password, rol} = req.body; 

    const usuario = new Usuario({nombre, correo, password, rol});

    //verificacion de correo

    //encriptar contraseña

    const salt = bcriptjs.genSaltSync();

    usuario.password = bcriptjs.hashSync( password, salt);

    await usuario.save();


    res.json({
        msg: 'post API - Controlador',
        usuario
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;

    const { password, google, correo,  ...resto } = req.body; 

    if( password ){

        const salt = bcriptjs.genSaltSync();

        resto.password = bcriptjs.hashSync( password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );
    res.json({
        msg: 'put API - Controlador',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controlador'
    });
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    //fisicamente lo borramos

    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false });

    res.json({
        msg: 'delete API - Controlador',
        usuario
    });
}

module.exports = {

    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}