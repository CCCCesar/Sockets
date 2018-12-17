//importando libreria express
import express from 'express';
import {SERVER_PORT} from '../globals/environment';
import http from 'http';
import SocketIO from 'socket.io';

//creando la clase de servidor
export default class Server{
    //creando la variable del sevidor express
    public app:express.Application;
    public port:Number;
    private httpServer:http.Server;
    public io:SocketIO.Server;

    //contructor del server
    constructor(){
        this.app = express();
        this.port=SERVER_PORT;
        //Configurando el nuevo servidor web a través de http
        this.httpServer= new http.Server(this.app);
        this.io =SocketIO(this.httpServer);
        this.escucharSockets();

    }
    //Funcion para escuchar las conexiones
    public escucharSockets(){
        console.log("Listo para recibir  conexiones o sockets o clientes");
        //el servidor escucha el evento connect y recibe al cliente conectado
        this.io.on('connect',cliente=>{
            console.log("Nuevo cliente conectado");
            //el cliente que se ha conectado previanmente ,escucha su desconeccion
            cliente.on('disconnect',()=>{
                console.log("El Cliente sea desconectado");
            });
            // el cliente que se ha conectado previamente , escucha un evento de nombre : 'mensaje'
            cliente.on('mensaje',(payload)=>{//el ayload puede tener cualquier nombre como por ejemplo contenido
                console.log("entrada",payload);
                this.io.emit('mensaje-nuevo', payload);
            })
        });
    }
    //funcion para iniciar el servidor
    public start(callback:Function){
        this.httpServer.listen(this.port,callback);
    }
}