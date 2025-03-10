import express, { Application } from 'express';
import { connectToDatabase } from './database';
import usuarioRoutes from './routes/usuarioRoutes';
import productoRoutes from './routes/productoRoutes'

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(express.json()); 
    this.app.use(express.urlencoded({ extended: true })); 
  }

  routes(): void {
    this.app.use('/api', usuarioRoutes);
    this.app.use('/api', productoRoutes);
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