import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService, Producto } from '../../../services/cliente.service';
import * as bootstrap from 'bootstrap';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  productos: Producto[] = [];
  loading: boolean = true;
  error: string | null = null;
  filtroSeleccionado: string = 'nombre';
  busquedaTexto: string = '';
  selectedProducto: Producto | null = null;
  constructor(private router: Router, private route: ActivatedRoute, private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  isDashboardRoot(): boolean {
    return this.router.url === '/dashboard';
  }

  openInventoryModal() {
    $('#inventoryModal').modal('show'); // Abre el modal
  }

  actualizarPrecio(producto: any) {
    // Validar que sea un número válido
    const nuevoPrecio = parseFloat(producto.nuevoPrecio);
    if (isNaN(nuevoPrecio) || nuevoPrecio <= 0) {
      alert('Por favor ingresa un precio válido');
      return;
    }
    console.log(`Actualizando precio del producto ${producto.id} a $${nuevoPrecio}`);
  }

  eliminarProducto(productoId: number) {
    console.log(`Eliminando producto ${productoId}`);
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