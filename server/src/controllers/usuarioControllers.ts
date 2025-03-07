import { Request, Response } from 'express';
import Usuario from '../models/usuarioModel';
import bcrypt from 'bcryptjs';

export const registerUsuario = async (req: Request, res: Response): Promise<void> => {
  const { nombre, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const contraseniaHashed = await bcrypt.hash(password, salt);

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: contraseniaHashed,
    });

    const guardarUsuario = await nuevoUsuario.save();
    res.status(201).json(guardarUsuario);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUsuario = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    const esIgual = await bcrypt.compare(password, usuario.password);
    if (!esIgual) {
      res.status(400).json({ message: 'Contraseña incorrecta' });
      return;
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso', usuario });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};