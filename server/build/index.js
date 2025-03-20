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
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const clienteRoutes_1 = __importDefault(require("./routes/clienteRoutes"));
const almacenistaRoutes_1 = __importDefault(require("./routes/almacenistaRoutes"));
const vendedorRoutes_1 = __importDefault(require("./routes/vendedorRoutes"));
const cors_1 = __importDefault(require("cors"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const path = __importStar(require("path"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, cors_1.default)({
            origin: 'http://localhost:4200', // Solo permite solicitudes desde Angular
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATH'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use('/uploads', express_1.default.static(path.join(__dirname, '../uploads')));
        //console.log('Ruta de uploads:', path.join(__dirname, '../uploads'));
        //this.app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
    }
    routes() {
        this.app.use('/api', clienteRoutes_1.default);
        this.app.use('/api', almacenistaRoutes_1.default);
        this.app.use('/api', vendedorRoutes_1.default);
        this.app.use('/api', uploadRoutes_1.default);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, database_1.connectToDatabase)();
                this.app.listen(this.app.get('port'), () => {
                    console.log(`Server on port ${this.app.get('port')}`);
                });
            }
            catch (error) {
                console.error('Error al iniciar el servidor:', error);
            }
        });
    }
}
const server = new Server();
server.start();
