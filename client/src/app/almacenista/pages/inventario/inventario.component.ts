import { Component } from '@angular/core';
import { Producto, ProductoService } from '../../../services/producto.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-inventario',
  standalone: false,
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent {
  productos: any[] = [];
  loading: boolean = true;
  filtroSeleccionado: string = 'nombre';
  busquedaTexto: string = '';
  selectedProducto: Producto | null = null;
  error: string | null = null;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.loading = true;
    this.productoService.obtenerProductos().subscribe({
      next: (response) => {
        this.productos = response.lista;
        this.loading = false;
        console.log('Productos obtenidos:', response.lista);
      },
      error: (err) => {
        this.error = 'Error al cargar los productos. Intente nuevamente.';
        this.loading = false;
        console.error('Error al obtener productos:', err);
      }
    });
  }

  eliminarProducto(codigo_barras: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.eliminarProducto(codigo_barras).subscribe(
        () => {
          console.log(`Producto con código ${codigo_barras} eliminado`);
          this.productos = this.productos.filter(p => p.codigo_barras !== codigo_barras);
        },
        (error) => {
          console.error('Error al eliminar producto:', error);
        }
      );
    }
  }

  actualizarProducto(producto: any): void {
    console.log('Actualizar producto:', producto);
  }
  
    abrirModal(producto: Producto): void {
      this.selectedProducto = producto; 
      const modalElement = document.getElementById('productoModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
}
