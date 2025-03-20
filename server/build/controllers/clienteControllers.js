"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerProductosMarca = exports.obtenerProductosPrecio = exports.obtenerProductosTamanio = exports.obtenerProductosNombre = exports.obtenerProductosActivos = void 0;
const productoModel_1 = __importDefault(require("../models/productoModel"));
/obtiene todos los productos activos- cliente/;
const obtenerProductosActivos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield productoModel_1.default.find({ estatus: "activo" });
        if (productos.length === 0) {
            res.status(404).json({
                message: 'No hay productos'
            });
            return;
        }
        res.status(200).json({
            message: 'Lista de productos',
            lista: productos
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.obtenerProductosActivos = obtenerProductosActivos;
/obtiene producto por nombre- cliente/;
const obtenerProductosNombre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_producto } = req.params;
    try {
        const productos = yield productoModel_1.default.find({
            nombre_producto: { $regex: new RegExp(nombre_producto, 'i') },
            estatus: "activo"
        });
        if (productos.length === 0) {
            res.status(200).json({
                message: `No se encontraron productos con el nombre ${nombre_producto}`
            });
            return;
        }
        res.status(200).json({
            message: 'Productos encontrados',
            lista: productos
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.obtenerProductosNombre = obtenerProductosNombre;
/obtiene producto por tamaño- cliente MEJORARRRRR/;
const obtenerProductosTamanio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tamanio } = req.params;
    try {
        const tamanios = yield productoModel_1.default.find({
            tamanio: { $regex: new RegExp(tamanio, 'i') },
            estatus: "activo"
        });
        if (tamanios.length === 0) {
            res.status(404).json({ message: `No existen productos con este tamaño ${tamanio}` });
        }
        res.status(200).json({ tamanios });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.obtenerProductosTamanio = obtenerProductosTamanio;
/obtiene producto por precio entre un rango- cliente/;
const obtenerProductosPrecio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rango } = req.params;
    try {
        if (!rango.includes('-')) {
            res.status(400).json({ message: 'Formato de rango invalido. Use 0-250, 250-650, etc.' });
            return;
        }
        const [minStr, maxStr] = rango.split('-');
        const min = parseFloat(minStr);
        const max = parseFloat(maxStr);
        if (isNaN(min) || isNaN(max)) {
            res.status(400).json({ message: 'Los valores del rango deben ser numeros' });
            return;
        }
        const productos = yield productoModel_1.default.find({
            precio_pieza: { $gte: min, $lte: max },
            estatus: "activo"
        });
        if (productos.length === 0) {
            res.status(404).json({ message: `No hay productos entre $${min} y $${max}` });
            return;
        }
        res.status(200).json({
            message: 'Productos encontrados',
            lista: productos
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.obtenerProductosPrecio = obtenerProductosPrecio;
/obtiene producto por marca- cliente/;
const obtenerProductosMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { marca } = req.params;
    try {
        const marcas = yield productoModel_1.default.find({
            marca: { $regex: new RegExp(marca, 'i') },
            estatus: "activo"
        });
        if (marcas.length === 0) {
            res.status(404).json({ message: `No existe la marca ${marca}` });
            return;
        }
        res.status(200).json({
            message: 'Marcas encontradss',
            lista: marcas
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.obtenerProductosMarca = obtenerProductosMarca;
