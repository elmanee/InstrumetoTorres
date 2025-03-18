import { Component } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-inventario',
  standalone: false,
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent {
  productos: any[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.obtenerProductos().subscribe((data: any) => {
      this.productos = data;
    });
  }

  actualizarProducto(producto: any): void {
    console.log('Actualizar producto:', producto);
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe(() => {
        alert('Producto eliminado');
        this.obtenerProductos(); // Recargar lista
      });
    }
  }
}
