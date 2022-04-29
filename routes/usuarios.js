const { Router } = require('express');

const { check, param } = require('express-validator')

const Role = require('../models/role');

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuariosDelete } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');

const { esRoleValido,
        existeEmail,
    existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();



router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un id Válido').isMongoId(), 
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos ],
    usuariosPut );


router.post('/', [
    check('correo', 'El correo no es válido').isEmail(),
    check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y mas de 6 letras').isLength( {min:6}).not().isEmpty(),
    check('rol').custom( esRoleValido ),
    check('correo').custom( existeEmail ),
    validarCampos
    
]
, usuariosPost);

router.delete('/:id', [
    check('id', 'No es un id Válido').isMongoId(), 
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],
usuariosDelete);

router.delete('/', usuariosPatch );



module.exports = router; 