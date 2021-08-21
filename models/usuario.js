
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'La contraseña es obligatorio']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        require: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },    
});

UsuarioSchema.methods.toJSON = function(){// tienes que ser una funcion normal, no flecha. sino no funciona

    const {__v, password, ...usuario} = this.toObject();
    return usuario
}

module.exports = model( 'Usuarios', UsuarioSchema );