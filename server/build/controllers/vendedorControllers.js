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
exports.actualizarExhibe = exports.obtenerProductosPrecio = exports.obtenerProductosPasillo = exports.obtenerProductosTamanio = exports.obtenerProductosMarca = exports.obtenerProductoPorCodigo = exports.obtenerProductosNombre = void 0;
const productoModel_1 = __importDefault(require("../models/productoModel"));
const historialExhibe_1 = __importDefault(require("../models/historialExhibe"));
/obtiene producto por nombre- vendedor/;
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
/obtiene producto por codigo de barras- vendedor/;
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
/obtiene producto por marca- vendedor/;
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
/obtiene producto por tamaño- vendedor/;
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
/obtiene producto por pasillo- vendedor/;
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
/obtiene producto por precio entre un rango- vendedor/;
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
            precio_pieza: { $gte: min, $lte: max }
        });
        if (productos.length === 0) {
            res.status(404).json({ message: `No hay productos entre $${min} y $${max}` });
            return;
        }
        res.status(200).json(productos);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.obtenerProductosPrecio = obtenerProductosPrecio;
/Actualiza existencia-exhibe/;
const actualizarExhibe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo_barras } = req.params;
    const { cantidadIn } = req.body;
    try {
        const producto = yield productoModel_1.default.findOne({ codigo_barras });
        if (!producto) {
            res.status(404).json({
                message: 'Producto no encontrado'
            });
            return;
        }
        var cantAlamcen = producto.existencia_almacen;
        var cantAct = cantAlamcen - cantidadIn;
        const agregacionExhibe = new historialExhibe_1.default({
            codigo_barras: producto.codigo_barras,
            nombre_producto: producto.nombre_producto,
            cantidad: cantidadIn,
            fecha_relleno: new Date()
        });
        producto.existencia_almacen = cantAct;
        yield Promise.all([
            producto.save(),
            agregacionExhibe.save()
        ]);
        res.status(200).json({
            message: 'Exhibe fue actualizado',
            producto_actualizado: producto
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
exports.actualizarExhibe = actualizarExhibe;
