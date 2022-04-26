const express = require('express');

class Server {
     
    constructor(){
         this.app = express();
         this.port = process.env.PORT;

         //middlewares

         this.middlewares();

         // rutas de mi aplicación
         this.routes();

    }

    middlewares(){

        this.app.use( express.json() );
         
        //directorio publico
         this.app.use( express.static('public'));
    }

    routes(){  
       
        this.app.use('/api/usuarios', require('../routes/usuarios'));

        
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Listen in port ${this.port}`) 
        })
    }
    
}

module.exports = Server; 