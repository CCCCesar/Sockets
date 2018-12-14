import Server from './classes/server';
import bodyParser from 'body-parser';
import cors from 'cors';
import {router} from './routes/router';
//instanciado al servidor
 const server = new Server();
 //configurando bodyparser para que los argumentos que lleguen por la urlcoded
 //lleguen en el arreglo 'body' del request
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());
//CORS
server.app.use(cors({origin:true, credentials:true}))
//configurando la rutas
server.app.use('/',router);
//iniciando el servidor 
 server.start(()=>{
     console.log(`Servidor corriendo en el puerto ${server.port}`)
 });
 
