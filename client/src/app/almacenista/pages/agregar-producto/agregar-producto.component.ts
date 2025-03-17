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
      imagen: ['', Validators.required],
      codigo_barras: ['', Validators.required],
      nombre_producto: ['', Validators.required],
      marca: ['', Validators.required],
      nombre_proveedor: ['', Validators.required],
      tamanio: ['', Validators.required],
      categoria: ['', Validators.required],
      precio_pieza: ['', Validators.required],
      precio_caja: ['', Validators.required],
      cantidad_caja: ['', Validators.required],
      pasillo: ['', Validators.required],
      estatus: ['', Validators.required],
      existencia_almacen: ['', Validators.required],
      existencia_exhibe: ['', Validators.required], 
      stock_almacen: ['', Validators.required],
      stock_exhibe: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.productoForm.invalid) {
      alert('Todos los campos son obligatorios. Revisa el formulario.');
      return;
    }
    console.log('Formulario enviado:', this.productoForm.value);
  }
}
