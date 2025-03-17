"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clienteControllers_1 = require("../controllers/clienteControllers");
const router = (0, express_1.Router)();
router.post('/register', clienteControllers_1.registerUsuario);
router.post('/login', clienteControllers_1.loginUsuario);
exports.default = router;
