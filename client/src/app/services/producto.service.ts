import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private APIURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  crearProducto(producto: any): Observable<any> {
    return this.http.post(`${this.APIURL}/crear_productos`, producto);
  }

  obtenerProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.APIURL}/obtener_productos`);
  }

  obtenerProductoPorCodigo(codigoBarras: string): Observable<any> {
    return this.http.get<any>(`${this.APIURL}/obtener_producto/codigo/${codigoBarras}`);
  }

  obtenerProductosPorCategoria(categoria: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.APIURL}/obtener_producto/categoria/${categoria}`);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.APIURL}/eliminar/${id}`); // Ajusta la ruta según tu API
  }

}
