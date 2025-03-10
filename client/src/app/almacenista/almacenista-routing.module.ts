import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarProductoComponent } from './pages/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './pages/editar-producto/editar-producto.component';

const routes: Routes = [
  {
    path: 'almacenista',
    component: AgregarProductoComponent,
    data: { role: 'almacenista' },
    children: [
      { path: 'agregar', component: AgregarProductoComponent },
      { path: 'editar', component: EditarProductoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenistaRoutingModule {}