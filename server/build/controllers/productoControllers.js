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
exports.actualizarExistencias = exports.eliminarProducto = exports.actualizarProducto = exports.obtenerProductosPrecio = exports.obtenerProductosTamanio = exports.obtenerProductosMarca = exports.obtenerProductosPasillo = exports.obtenerProductosCategoria = exports.obtenerProductosNombre = exports.obtenerProductoPorCodigo = exports.obtenerProductos = exports.crearProducto = void 0;
const productoModel_1 = __importDefault(require("../models/productoModel"));
const historialPreciosModel_1 = __importDefault(require("../models/historialPreciosModel"));
const loteCompraModel_1 = __importDefault(require("../models/loteCompraModel"));
/creacion del producto/;
const crearProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { imagen, codigo_barras, nombre_producto, marca, nombre_proveedor, tamanio, categoria, precio_pieza, precio_caja, cantidad_caja, pasillo, existencia_almacen, existencia_exhibe, stock_almacen, stock_exhibe } = req.body;
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
            estatus: "activo",
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
/obtiene todos los productos/;
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
/obtiene producto por categoria/;
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
/obtiene producto por tamaño/;
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
/obtiene producto por precio entre un rango/;
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
/*
para probar actualizacion
{
  "nuevo_precio": 5410.45
}
*/
/actualizar precio de un producto/;
const actualizarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo_barras } = req.params;
    const { nuevo_precio } = req.body;
    try {
        if (!codigo_barras || !nuevo_precio) {
            res.status(400).json({ message: 'Faltan campos obligatorios' });
            return;
        }
        if (isNaN(Number(nuevo_precio))) {
            res.status(400).json({ message: 'El precio debe ser un número válido' });
            return;
        }
        const producto = yield productoModel_1.default.findOne({ codigo_barras });
        if (!producto) {
            res.status(404).json({ message: 'Producto no encontrado' });
            return;
        }
        if (producto.precio_pieza === nuevo_precio) {
            res.status(200).json({ message: 'El precio es el mismo, no se realizaron cambios' });
            return;
        }
        const registroHistorico = new historialPreciosModel_1.default({
            codigo_barras: producto.codigo_barras,
            nombre_producto: producto.nombre_producto,
            marca: producto.marca,
            tamanio: producto.tamanio,
            precio_anterior: producto.precio_pieza,
            precio_nuevo: nuevo_precio,
            fecha: new Date()
        });
        producto.precio_pieza = nuevo_precio;
        yield Promise.all([
            producto.save(),
            registroHistorico.save()
        ]);
        res.status(200).json({
            message: 'Precio actualizado e historial guardado',
            producto_actualizado: producto
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el precio'
        });
    }
});
exports.actualizarProducto = actualizarProducto;
/Elimar productos/;
const eliminarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo_barras } = req.params;
    try {
        const resultado = yield productoModel_1.default.deleteOne({ codigo_barras });
        if (resultado.deletedCount === 0) {
            res.status(404).json({ message: 'El producto no existe' });
            return;
        }
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
exports.eliminarProducto = eliminarProducto;
/Actualizar existencias/;
const actualizarExistencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo_barras } = req.params;
    const { valAlmacen, fecha_caducidad } = req.body;
    try {
        if (isNaN(Number(valAlmacen))) {
            res.status(400).json({
                message: 'El valor debe ser un numero valido'
            });
            return;
        }
        const producto = yield productoModel_1.default.findOne({ codigo_barras });
        if (!producto) {
            res.status(404).json({
                message: 'Producto no encontrado'
            });
            return;
        }
        var numLote = 101;
        const rellenoAlmacen = new loteCompraModel_1.default({
            codigo_barras: producto.codigo_barras,
            numero_lote: numLote,
            nombre_producto: producto.nombre_producto,
            cantidad_cajas: valAlmacen,
            fecha_compra: new Date(),
            fecha_caducidad: fecha_caducidad
        });
        producto.existencia_almacen = valAlmacen;
        yield Promise.all([
            producto.save(),
            rellenoAlmacen.save()
        ]);
        res.status(200).json({
            message: 'Existencia actualizadas',
            producto_actualizado: producto
        });
        numLote++;
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
exports.actualizarExistencias = actualizarExistencias;
