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
exports.obtenerProductosPasillo = exports.obtenerProductosCategoria = exports.obtenerProductosNombre = exports.obtenerProductoPorCodigo = exports.obtenerProductos = exports.crearProducto = void 0;
const productoModel_1 = __importDefault(require("../models/productoModel"));
const crearProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { imagen, codigo_barras, nombre_producto, marca, nombre_proveedor, tamanio, categoria, precio_pieza, precio_caja, cantidad_caja, pasillo, estatus, existencia_almacen, existencia_exhibe, stock_almacen, stock_exhibe } = req.body;
    try {
        const existeProducto = yield productoModel_1.default.findOne({ codigo_barras });
        ;
        if (existeProducto) {
            res.status(400).json({ message: 'EL producto ya existe' });
            return;
        }
        const nuevoProducto = new productoModel_1.default({
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
        const guardarProducto = yield nuevoProducto.save();
        res.status(201).json('Producto guardado con exito');
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.crearProducto = crearProducto;
const obtenerProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield productoModel_1.default.find();
        res.status(200).json(productos);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.obtenerProductos = obtenerProductos;
const obtenerProductoPorCodigo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo_barras } = req.params;
    try {
        const producto = yield productoModel_1.default.findOne({ codigo_barras });
        if (producto) {
            res.status(200).json(producto);
        }
        else {
            res.status(404).json({ message: 'El producto no existe' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.obtenerProductoPorCodigo = obtenerProductoPorCodigo;
const obtenerProductosNombre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_producto } = req.params;
    try {
        const productos = yield productoModel_1.default.find({ nombre_producto: { $regex: new RegExp(nombre_producto, 'i') } });
        if (productos.length === 0) {
            res.status(404).json({ message: `No existe productos con el nombre ${nombre_producto}` });
            return;
        }
        res.status(200).json(productos);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.obtenerProductosNombre = obtenerProductosNombre;
const obtenerProductosCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoria } = req.params;
    try {
        const productos = yield productoModel_1.default.find({ categoria: { $regex: new RegExp(categoria, 'i') } });
        if (productos.length === 0) {
            res.status(404).json({ message: `No hay productos de esta categoria ${categoria}` });
            return;
        }
        res.status(200).json(productos);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.obtenerProductosCategoria = obtenerProductosCategoria;
const obtenerProductosPasillo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pasillo } = req.params;
    try {
        const pasillos = yield productoModel_1.default.find({ pasillo: { $regex: new RegExp(pasillo, 'i') } });
        if (pasillos.length === 0) {
            res.status(404).json({ message: `No existe el pasillo ${pasillo}` });
            return;
        }
        res.status(200).json(pasillos);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.obtenerProductosPasillo = obtenerProductosPasillo;
