import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


export interface Producto {
  nombre_producto: string;
  descripcion: string;
  marca: string;
  tamanio: string;
  precio_pieza: number;
  precio_kg: number;
  cantidad: number;
  imagen: string;
  codigo_barras: string;
  estatus: string;
}

export interface ProductoResponse {
  message: string;
  lista: Producto[];
}
@Injectable({
  providedIn: 'root'
})
export class ProductoService {  

  private APIURL = 'http://localhost:3000/api';
  
    constructor(private http: HttpClient) { }
  
    obtenerProductos(): Observable<ProductoResponse> {
      return this.http.get<ProductoResponse>(`${this.APIURL}/obtener_productos/dashboard`)
        .pipe(
          tap(response => {
            console.log('Respuesta de obtener productos:', response);
          })
        );}
  
    obtenerProductosPorNombre(nombre: string): Observable<ProductoResponse> {
      return this.http.get<ProductoResponse>(`${this.APIURL}/obtener_productos/dashboard/nombre/${nombre}`);
    }
  
    // Corregir la URL y la estructura de respuesta
    obtenerProductosPorTamanio(tamanio: string): Observable<ProductoResponse> {
      return this.http.get<ProductoResponse>(`${this.APIURL}/obtener_productos/dashboard/tamanio/${tamanio}`);
    }
  
    obtenerProductosPorPrecio(min: number, max: number): Observable<ProductoResponse> {
      return this.http.get<ProductoResponse>(`${this.APIURL}/obtener_productos/dashboard/precio/${min}-${max}`);
    }
  
    obtenerProductosPorMarca(marca: string): Observable<ProductoResponse> {
      return this.http.get<ProductoResponse>(`${this.APIURL}/obtener_productos/dashboard/marca/${marca}`);
    }
    
    eliminarProducto(codigo_barras: number): Observable<ProductoResponse> {
      return this.http.get<ProductoResponse>(`${this.APIURL}/obtener_productos/dashboard/codigo_barras/${codigo_barras}`);
    }
    
    agregarProducto(producto: Producto): Observable<ProductoResponse> {
      return this.http.post<ProductoResponse>(`${this.APIURL}/agregar_producto`, producto);
    }
  }
