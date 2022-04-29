const Role = require('../models/role');

const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '' )=>{
    const existeRol = await Role.findOne({rol});

    if( !existeRol ){
        throw new Error(`El rol ${rol} no está registrado en la base de datos` );
    }
}

const existeEmail = async( correo = '')=>{
       
     
    const existeEmail = await Usuario.findOne({ correo });

    if( existeEmail ) {

        throw new Error(`El email ${email} ya se encuentra registrado en el sistema.`);
    }

}

const existeUsuarioPorId = async( id = '')=>{
       
     
    const existeId = await Usuario.findById( id );

    if( !existeId ) {

        throw new Error(`El id ${id} no se encuentra registrado en el sistema.`);
    }

}

module.exports = {

    esRoleValido,
    existeEmail,
    existeUsuarioPorId
    
}