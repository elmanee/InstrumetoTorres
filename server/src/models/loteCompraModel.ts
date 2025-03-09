import mongoose, { Document, Schema } from 'mongoose';

interface ILoteCompra extends Document {
  numero_lote: number;
  nombre_producto: string;
  cantidad_cajas: number;
  fecha_compra: Date;
  fecha_caducidad: Date;
}

const LoteCompraSchema: Schema = new Schema({
  numero_lote: { type: Number, required: true },
  nombre_producto: { type: String, required: true },
  cantidad_cajas: { type: Number, required: true },
  fecha_compra: { type: Date, required: true },
  fecha_caducidad: { type: Date, required: true },
});

export default mongoose.model<ILoteCompra>('LoteCompra', LoteCompraSchema);