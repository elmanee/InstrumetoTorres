import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './componenets/dashboard/dashboard.component';
import { AlmacenistaComponent } from './componenets/almacenista/almacenista.component';
import { AgregarProductoComponent } from './componenets/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './componenets/editar-producto/editar-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AlmacenistaComponent,
    AgregarProductoComponent,
    EditarProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
