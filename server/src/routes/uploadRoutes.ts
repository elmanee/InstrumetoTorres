import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';

const router = Router();

// Configurar Multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../uploads'),
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Interfaz para los archivos subidos
interface MulterFile {
  path: string;
  originalname: string;
}

// Función para mover archivos a la carpeta final
const saveImage = async (file: MulterFile): Promise<string> => {
  const newPath = path.join(__dirname, '../../uploads', file.originalname);
  await fs.rename(file.path, newPath);
  return newPath;
};

// Ruta para subir una imagen única
router.post('/upload/single', upload.single('imagenPerfil'), async (req: Request, res: Response) => {
  try {
    const file = req.file as MulterFile;
    if (!file) {
      res.status(400).json({ error: 'No se recibió ninguna imagen' });
      return;
    }

    const newPath = await saveImage(file);
    res.json({ message: 'Imagen subida con éxito', path: newPath });
  } catch (error) {
    console.error('Error al subir imagen:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Ruta para subir múltiples imágenes
router.post('/upload/multi', upload.array('photos', 10), async (req: Request, res: Response) => {
  try {
    const files = req.files as MulterFile[];
    if (!files || files.length === 0) {
      res.status(400).json({ error: 'No se recibieron imágenes' });
      return;
    }

    const savedPaths = await Promise.all(files.map(saveImage));
    res.json({ message: 'Imágenes subidas con éxito', paths: savedPaths });
  } catch (error) {
    console.error('Error al subir imágenes:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

export default router;
