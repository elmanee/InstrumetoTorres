"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vendedorControllers_1 = require("../controllers/vendedorControllers");
const router = (0, express_1.Router)();
router.get('/obtener_producto/nombre/:nombre_producto', vendedorControllers_1.obtenerProductosNombre);
router.get('/obtener_producto/codigo/:codigo_barras', vendedorControllers_1.obtenerProductoPorCodigo);
router.get('/obtener_producto/marca/:marca', vendedorControllers_1.obtenerProductosMarca);
router.get('/obtener_producto/tamanio/:tamanio', vendedorControllers_1.obtenerProductosTamanio);
router.get('/obtener_producto/pasillo/:pasillo', vendedorControllers_1.obtenerProductosPasillo);
exports.default = router;
