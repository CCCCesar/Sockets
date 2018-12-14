//importando libreria express
import express from 'express';
import {SERVER_PORT} from '../globals/environment';
//creando la clase de servidor
export default class Server{
    //creando la variable del sevidor express
    public app:express.Application;
    public port:Number;
    //contructor del server
    constructor(){
        this.app = express();
        this.port=SERVER_PORT;
    }
    //funcion para iniciar el servidor
    public start(callback:Function){
        this.app.listen(this.port,callback);
    }
}