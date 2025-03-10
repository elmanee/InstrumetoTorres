import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-agregar-producto',
  standalone: false,
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css'
})
export class AgregarProductoComponent implements OnInit {
  productoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      imagen: ['url_imagen10.jpg', Validators.required],
      codigo_barras: [12345678901378, Validators.required],
      nombre_producto: ['Longaniza', Validators.required],
      marca: ['Bachoco', Validators.required],
      nombre_proveedor: [['Javier Ortega', 'Elena Ríos'], Validators.required],
      tamanio: ['1 Kg', Validators.required],
      categoria: ['Carne Cerdo', Validators.required],
      precio_pieza: [32.00, Validators.required],
      precio_caja: [300.00, Validators.required],
      cantidad_caja: [12, Validators.required],
      pasillo: ['C1', Validators.required],
      estatus: ['activo', Validators.required],
      existencia_almacen: [150, Validators.required],  // NUEVO
      existencia_exhibe: [120, Validators.required],   // NUEVO
      stock_almacen: [250, Validators.required],       // NUEVO
      stock_exhibe: [200, Validators.required]         // NUEVO
    });
  }

  onSubmit(): void {
    if (this.productoForm.valid) {
      console.log('Producto a enviar:', this.productoForm.value);
      // Aquí puedes integrar la API para enviar los datos
    }
  }
}
