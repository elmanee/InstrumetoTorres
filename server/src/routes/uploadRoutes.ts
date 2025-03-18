import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

const router = Router();

// ✅ Asegurar que la carpeta "uploads" existe
import fs from 'fs';
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Configurar multer correctamente
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Guarda las imágenes en "uploads/"
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombra el archivo con la fecha
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('imagen'), async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ message: 'No se subió ninguna imagen' });
        return;
      }
  
      const imagePath = `/uploads/${req.file.filename}`;
           
      res.json({ message: 'Imagen subida con éxito', imagePath });
  } catch (error) {
    const err = error as Error; // 🔹 Hacemos un cast explícito
    res.status(500).json({ message: 'Error en el servidor', error: err.message });
  }
  });
  

export default router;
