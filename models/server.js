const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/confg.db');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Conectar a base de datos 
        this.conectarDB();

        //Middleware (SOn funciones que van a añadirle otra funconalidad al web server )

        this.middlewares();
        //RUtas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares(){
        //cors
        this.app.use(cors());

        //Lectura y Praseo del body
        this.app.use( express.json() );
    
        //Directorio público
        this.app.use(express.static('public'));
    }

    routes() {
       this.app.use(this.usuariosPath, require('../routes/user'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servicio corriendo en puerto', process.env.PORT);
        });
    }
}

module.exports = Server;