
const { Router } = require('express');
const {check} = require('express-validator');

const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const {validarCampos} = require('../middelwares/validar-campo');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosPatch, 
        usuariosDelete } = require('../controllers/user');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
        check('id', 'No es un id válido').custom(existeUsuarioPorId).isMongoId(),
        check('rol').custom(esRolValido),
        validarCampos
], usuariosPut);

router.post('/', [
        check('nombre','El nombre no es obligatorio').not().isEmpty(),
        check('password','El password debe ser de mas de 6 digitos').isLength({ min: 6}),
        check('correo', 'El correo no es válido').custom(emailExiste).isEmail(),
        check('rol').custom(esRolValido),
       //check('rol','El rol no es válido').isIn(['ADMIN_ROLE','USER_ROLE']),
        validarCampos
], usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/:id', [
        check('id', 'No es un id válido').custom(existeUsuarioPorId).isMongoId(),
        validarCampos
], usuariosDelete);


module.exports = router;
