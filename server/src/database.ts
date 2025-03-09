import mongoose from 'mongoose';
import keys from './keys';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(keys.mongoURI);
    console.log('Conectado a MongoDB con Mongoose');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
    process.exit(1);
  }
};