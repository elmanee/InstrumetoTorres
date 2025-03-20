import express, { Application } from 'express';
import { connectToDatabase } from './database';
import clienteRoutes from './routes/clienteRoutes';
import almacenistaRoutes from './routes/almacenistaRoutes';
import vendedorRoutes from './routes/vendedorRoutes';
import uploadRoutes from './routes/uploadRoutes';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

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

    // Configurar Multer para almacenar archivos en la carpeta 'uploads'
    const storage = multer.diskStorage({
      destination: path.join(__dirname, '../uploads'),
      filename: (_req, file, cb) => {
        cb(null, file.originalname);
      },
    });

    const upload = multer({ storage });

    // Ruta estática para acceder a los archivos subidos
    this.app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
  }

  routes(): void {
    this.app.use('/api', clienteRoutes);
    this.app.use('/api', almacenistaRoutes);
    this.app.use('/api', vendedorRoutes);
    this.app.use('/api', uploadRoutes); // Rutas para subir archivos
  }

  async start(): Promise<void> {
    try {
      await connectToDatabase();
      this.app.listen(this.app.get('port'), () => {
        console.log(`🚀 Server running on port ${this.app.get('port')}`);
      });
    } catch (error) {
      console.error('❌ Error al iniciar el servidor:', error);
    }
  }
}

const server = new Server();
server.start();
