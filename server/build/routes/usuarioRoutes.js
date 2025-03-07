"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioControllers_1 = require("../controllers/usuarioControllers");
const router = (0, express_1.Router)();
router.post('/register', usuarioControllers_1.registerUsuario);
router.post('/login', usuarioControllers_1.loginUsuario);
exports.default = router;
