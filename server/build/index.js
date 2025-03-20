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
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const clienteRoutes_1 = __importDefault(require("./routes/clienteRoutes"));
const almacenistaRoutes_1 = __importDefault(require("./routes/almacenistaRoutes"));
const vendedorRoutes_1 = __importDefault(require("./routes/vendedorRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        // Configurar Multer para almacenar archivos en la carpeta 'uploads'
        const storage = multer_1.default.diskStorage({
            destination: path_1.default.join(__dirname, '../uploads'),
            filename: (_req, file, cb) => {
                cb(null, file.originalname);
            },
        });
        const upload = (0, multer_1.default)({ storage });
        // Ruta estática para acceder a los archivos subidos
        this.app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
    }
    routes() {
        this.app.use('/api', clienteRoutes_1.default);
        this.app.use('/api', almacenistaRoutes_1.default);
        this.app.use('/api', vendedorRoutes_1.default);
        this.app.use('/api', uploadRoutes_1.default); // Rutas para subir archivos
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, database_1.connectToDatabase)();
                this.app.listen(this.app.get('port'), () => {
                    console.log(`🚀 Server running on port ${this.app.get('port')}`);
                });
            }
            catch (error) {
                console.error('❌ Error al iniciar el servidor:', error);
            }
        });
    }
}
const server = new Server();
server.start();
