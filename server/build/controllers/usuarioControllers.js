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
exports.loginUsuario = exports.registerUsuario = void 0;
const usuarioModel_1 = __importDefault(require("../models/usuarioModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const registerUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, password } = req.body;
    try {
        const salt = yield bcryptjs_1.default.genSalt(10);
        const contraseniaHashed = yield bcryptjs_1.default.hash(password, salt);
        const nuevoUsuario = new usuarioModel_1.default({
            nombre,
            email,
            password: contraseniaHashed,
        });
        const guardarUsuario = yield nuevoUsuario.save();
        res.status(201).json(guardarUsuario);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.registerUsuario = registerUsuario;
const loginUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const usuario = yield usuarioModel_1.default.findOne({ email });
        if (!usuario) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        const esIgual = yield bcryptjs_1.default.compare(password, usuario.password);
        if (!esIgual) {
            res.status(400).json({ message: 'Contraseña incorrecta' });
            return;
        }
        res.status(200).json({ message: 'Inicio de sesión exitoso', usuario });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.loginUsuario = loginUsuario;
