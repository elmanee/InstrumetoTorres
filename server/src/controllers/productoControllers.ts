import { Request, Response } from "express";
import Producto from '../models/productoModel';

export const crearProducto = async (req: Request, res: Response): Promise<void> => {
  const { 
    imagen, 
    codigo_barras, 
    nombre_producto, 
    marca, 
    nombre_proveedor, 
    tamanio, 
    categoria,
    precio_pieza, 
    precio_caja, 
    cantidad_caja, 
    pasillo, 
    estatus, 
    existencia_almacen, 
    existencia_exhibe ,
    stock_almacen,
    stock_exhibe
  } = req.body;

  try {
    const existeProducto = await Producto.findOne({ codigo_barras });;
    if(existeProducto){
      res.status(400).json({ message: 'EL producto ya existe'});
      return;
    }

    const nuevoProducto = new Producto({ 
      imagen,
      codigo_barras,
      nombre_producto,
      marca,
      nombre_proveedor: Array.isArray(nombre_proveedor) ? nombre_proveedor : [nombre_proveedor], 
      tamanio,
      categoria,
      precio_pieza,
      precio_caja,
      cantidad_caja,
      pasillo,
      estatus,
      existencia_almacen,
      existencia_exhibe,
      stock_almacen,
      stock_exhibe,
    });

    const guardarProducto = await nuevoProducto.save();
    res.status(201).json('Producto guardado con exito');
  } catch (error: any) {
    res.status(400).json({ message: error.message }); 
  }
};

export const obtenerProductos  = async (req: Request, res:Response):Promise<void> => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos)
  } catch (error: any) {
    res.status(500).json({ message: error.message})
  }
}

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

export const obtenerProductosCategoria = async (req: Request, res: Response): Promise<void> => {
  const { categoria } = req.params;

  try {
    const productos = await Producto.find(
      { categoria: { $regex: new RegExp(categoria,'i')}}
    );

    if ( productos.length === 0 ){
      res.status(404).json({ message: `No hay productos de esta categoria ${categoria}`});
      return
    }
    
    res.status(200).json(productos);

  } catch (error: any) {
    res.status(500).json({ message: error.message});
  }
}

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



