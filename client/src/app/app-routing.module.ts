import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './almacenista/pages/dashboard/dashboard.component';
import { AgregarProductoComponent } from './almacenista/pages/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './almacenista/pages/editar-producto/editar-producto.component';
import { ClienteComponent } from './cliente/cliente.component';

const routes: Routes = [
  {
    path:'cliente',
    component: ClienteComponent,
    data: { name: 'Cliente'}
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { name: 'Panel Principal' },
    children: [
      { path: 'agregar', component: AgregarProductoComponent, data: { name: 'Agregar Producto' }},
      { path: 'editar/:id', component:  EditarProductoComponent, data: { name: 'Editar Producto' }}
    ]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }