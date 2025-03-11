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
exports.obtenerProductosPasillo = exports.obtenerProductosTamanio = exports.obtenerProductosMarca = exports.obtenerProductoPorCodigo = exports.obtenerProductosNombre = void 0;
const productoModel_1 = __importDefault(require("../models/productoModel"));
/obtiene producto por nombre/;
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
/obtiene producto por codigo de barras/;
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
/obtiene producto por marca/;
const obtenerProductosMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { marca } = req.params;
    try {
        const marcas = yield productoModel_1.default.find({ marca: { $regex: new RegExp(marca, 'i') } });
        if (marcas.length === 0) {
            res.status(404).json({ message: `No existe la marca ${marca}` });
            return;
        }
        res.status(200).json(marcas);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.obtenerProductosMarca = obtenerProductosMarca;
const obtenerProductosTamanio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tamanio } = req.params;
    try {
        const tamanios = yield productoModel_1.default.find({ tamanio: { $regex: new RegExp(tamanio, 'i') } });
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
/obtiene producto por pasillo/;
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
/Actualiza existencia/;
