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
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const productoRoutes_1 = __importDefault(require("./routes/productoRoutes"));
const vendedorRoutes_1 = __importDefault(require("./routes/vendedorRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    routes() {
        this.app.use('/api', usuarioRoutes_1.default);
        this.app.use('/api', productoRoutes_1.default);
        this.app.use('/api', vendedorRoutes_1.default);
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
