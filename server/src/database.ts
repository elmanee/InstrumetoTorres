import { MongoClient } from 'mongodb';
import keys from './keys';

const client = new MongoClient(keys.mongoURI);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('conectado a MongoDB');
    return client.db(); 
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
    process.exit(1); 
  }
}

connectToDatabase()


export default client;