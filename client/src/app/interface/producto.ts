export interface Productos {
  imagen?: string;
  codigo_barras?: number;
  nombre_producto?: string;
  marca?: string;
  nombre_proveedor?: string[];
  tamanio?: string;
  categoria?: string;
  precio_pieza?: number;
  precio_caja?: number;
  cantidad_caja?: number;
  pasillo?: string;
  estatus?: string;
  existencia_almacen?: number;
  existencia_exhibe?: number;
  stock_almacen?: number;
  stock_exhibe?: number;
}
