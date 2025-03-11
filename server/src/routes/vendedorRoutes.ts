import { Router } from "express";
import {
  obtenerProductosNombre,
  obtenerProductoPorCodigo,
  obtenerProductosMarca,
  obtenerProductosTamanio,
  obtenerProductosPasillo
} from '../controllers/vendedorControllers'

const router = Router();

router.get('/obtener_producto/nombre/:nombre_producto',obtenerProductosNombre);
router.get('/obtener_producto/codigo/:codigo_barras', obtenerProductoPorCodigo)
router.get('/obtener_producto/marca/:marca', obtenerProductosMarca);
router.get('/obtener_producto/tamanio/:tamanio', obtenerProductosTamanio);
router.get('/obtener_producto/pasillo/:pasillo', obtenerProductosPasillo);


export default router;