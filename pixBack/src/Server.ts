import express, { Express,Request,Response, NextFunction } from "express";
import cors from "cors";
import usuarioRoute from './routes/user';

let server: Express = express();
let port: Number = Number(process.env.server_port || 3000);

server.use(cors());
server.use(express.json());

server.use((req:Request, res:Response, next: NextFunction)=>{
  console.log('['+(new Date)+ ']'+req.method +' '+req.url);
  next();
});

// chama a rota de usuarios
server.use(usuarioRoute);

// iniciar servidor
export default {
  start() {
    server.listen(port, () => {
      console.log(`Server started: ${process.env.server_port}`);
    });
  },
};
