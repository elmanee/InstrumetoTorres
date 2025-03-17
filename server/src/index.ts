import express, { Application } from 'express';
import { connectToDatabase } from './database';
import clienteRoutes from './routes/clienteRoutes';
import almacenistaRoutes from './routes/almacenistaRoutes';
import vendedorRoutes from './routes/vendedorRoutes';
import cors from 'cors';

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(cors());
    this.app.use(express.json()); 
    this.app.use(express.urlencoded({ extended: true })); 
  }

  routes(): void {
    this.app.use('/api', clienteRoutes);
    this.app.use('/api', almacenistaRoutes);
    this.app.use('/api', vendedorRoutes);
  }

  async start(): Promise<void> {
    try {
      await connectToDatabase(); 
      this.app.listen(this.app.get('port'), () => {
        console.log(`Server on port ${this.app.get('port')}`);
      });
    } catch (error) {
      console.error('Error al iniciar el servidor:', error);
    }
  }
}

const server = new Server();
server.start();