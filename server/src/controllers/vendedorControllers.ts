import { Request, Response } from "express";
import Producto from '../models/productoModel';


/obtiene producto por nombre/
export const obtenerProductosNombre = async (req: Request, res: Response): Promise<void> => {
  const { nombre_producto } = req.params;

  try {
    const productos = await Producto.find(
      { nombre_producto: { $regex: new RegExp(nombre_producto,'i')}}
    );
    if(productos.length === 0){
      res.status(404).json({ message: `No existe productos con el nombre ${nombre_producto}`})
      return
    }
      
    res.status(200).json(productos);

  } catch (error: any) {
    res.status(500).json({ message: error.message})
  }
}

/obtiene producto por codigo de barras/
export const obtenerProductoPorCodigo = async (req: Request, res: Response): Promise<void> => {
  const { codigo_barras } = req.params;

  try {
    const producto = await Producto.findOne({ codigo_barras});
    if(producto){
      res.status(200).json(producto);
    }else{
      res.status(404).json({ message: 'El producto no existe'});
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message});
  }
}

/obtiene producto por marca/
export const obtenerProductosMarca = async (req: Request, res:Response): Promise<void> => {
  const { marca } = req.params;

  try {
    const marcas = await Producto.find(
      { marca: {$regex: new RegExp(marca,'i')}}
    );

    if( marcas.length === 0){
      res.status(404).json({ message: `No existe la marca ${marca}`})
      return
    }

    res.status(200).json(marcas);
    
  } catch (error:any) {
    res.status(500).json({ message: error.message})
  }
}

export const obtenerProductosTamanio = async (req: Request, res: Response):Promise<void> => {
  const { tamanio } = req.params;

  try {
    const tamanios = await Producto.find(
      {tamanio: {$regex: new RegExp(tamanio,'i')}}
    );

    if(tamanios.length === 0){
      res.status(404).json({ message: `No existen productos con este tamaño ${tamanio}`})
    }

    res.status(200).json({tamanios})
  } catch (error:any) {
    res.status(500).json({ message: error.message})
  }
}

/obtiene producto por pasillo/
export const obtenerProductosPasillo = async (req: Request, res:Response): Promise<void> => {
  const { pasillo } = req.params;

  try {
    const pasillos = await Producto.find(
      { pasillo: {$regex: new RegExp(pasillo,'i')}}
    );

    if( pasillos.length === 0){
      res.status(404).json({ message: `No existe el pasillo ${pasillo}`})
      return
    }

    res.status(200).json(pasillos);
    
  } catch (error:any) {
    res.status(500).json({ message: error.message})
  }
}

/Actualiza existencia/
