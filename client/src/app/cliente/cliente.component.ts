import { Component, OnInit } from '@angular/core';
import { ClienteService, Producto } from '../../app/services/cliente.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-cliente',
  standalone: false,
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {
  productos: Producto[] = [];
  loading: boolean = true;
  error: string | null = null;
  filtroSeleccionado: string = 'nombre';
  busquedaTexto: string = '';
  selectedProducto: Producto | null = null; // Variable para almacenar el producto seleccionado

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.loading = true;
    this.clienteService.obtenerProductosActivos().subscribe({
      next: (response) => {
        this.productos = response.lista;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los productos. Intente nuevamente.';
        this.loading = false;
        console.error('Error al obtener productos:', err);
      }
    });
  }

  buscarProductos(): void {
    this.loading = true;

    if (!this.busquedaTexto.trim()) {
      this.cargarProductos();
      return;
    }

    switch (this.filtroSeleccionado) {
      case 'nombre':
        this.clienteService.obtenerProductosPorNombre(this.busquedaTexto).subscribe({
          next: (response) => {
            this.productos = response.lista;
            this.loading = false;
          },
          error: (err) => {
            this.manejarError(err);
          }
        });
        break;
      case 'marca':
        this.clienteService.obtenerProductosPorMarca(this.busquedaTexto).subscribe({
          next: (response) => {
            this.productos = response.lista;
            this.loading = false;
          },
          error: (err) => {
            this.manejarError(err);
          }
        });
        break;
      case 'tamanio':
        this.clienteService.obtenerProductosPorTamanio(this.busquedaTexto).subscribe({
          next: (response) => {
            this.productos = response.lista; // Cambiar de response.tamanios a response.lista
            this.loading = false;
          },
          error: (err) => {
            this.manejarError(err);
          }
        });
        break;
      case 'precio':
        const precios = this.busquedaTexto.split('-').map(Number);
        if (precios.length !== 2 || precios.some(isNaN)) {
          this.error = 'Formato inválido. Use: min-max (Ej: 100-500)';
          this.loading = false;
          return;
        }
        const [min, max] = precios;

        if (!isNaN(min) && !isNaN(max)) {
          this.clienteService.obtenerProductosPorPrecio(min, max).subscribe({
            next: (response) => {
              this.productos = response.lista;
              this.loading = false;
            },
            error: (err) => {
              this.manejarError(err);
            }
          });
        } else {
          this.error = 'Formato de rango inválido. Use formato: min-max (Ejemplo: 100-500)';
          this.loading = false;
        }
        break;
      default:
        // Por defecto busca por nombre
        this.clienteService.obtenerProductosPorNombre(this.busquedaTexto).subscribe({
          next: (response) => {
            this.productos = response.lista;
            this.loading = false;
          },
          error: (err) => {
            this.manejarError(err);
          }
        });
        break;
    }
  }

  private manejarError(err: any): void {
    this.error = 'Error al buscar productos. Intente nuevamente.';
    this.productos = [];
    this.loading = false;
    console.error('Error:', err);
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
