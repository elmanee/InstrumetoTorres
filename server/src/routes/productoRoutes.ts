import { Router } from "express";
import { 
  crearProducto, 
  obtenerProductos, 
  obtenerProductoPorCodigo, 
  obtenerProductosCategoria,
  obtenerProductosNombre,
  obtenerProductosPasillo
} from "../controllers/productoControllers";

const router = Router();

router.post('/crear_productos', crearProducto);
router.get('/obtener_productos', obtenerProductos);
router.get('/obtener_producto/codigo/:codigo_barras', obtenerProductoPorCodigo);
router.get('/obtener_producto/categoria/:categoria', obtenerProductosCategoria);
router.get('/obtener_producto/nombre/:nombre_producto', obtenerProductosNombre);
router.get('/obtener_producto/pasillo/:pasillo', obtenerProductosPasillo);

export default router;