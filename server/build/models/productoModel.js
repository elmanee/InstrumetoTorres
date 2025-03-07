"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const ProductoSchema = new mongoose_1.Schema({
    imagen: { type: String, required: true },
    codigo_barras: { type: Number, required: true },
    nombre_producto: { type: String, required: true },
    marca: { type: String, required: true },
    nombre_proveedor: { type: [String], required: true },
    tamanio: { type: String, required: true },
    precio_pieza: { type: Number, required: true },
    precio_caja: { type: Number, required: true },
    cantidad_caja: { type: Number, required: true },
    pasillo: { type: String, required: true },
    estatus: { type: String, required: true },
    existencia_almacen: { type: Number, required: true },
    existencia_exhibe: { type: Number, required: true },
    stock_almacen: { type: Number, required: true, default: 0 },
    stock_exhibe: { type: Number, required: true, default: 0 },
});
exports.default = mongoose_1.default.model('Producto', ProductoSchema);
