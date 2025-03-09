import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductoComponent } from './components/producto/producto.component';
import { AlmacenistaComponent } from './components/almacenista/almacenista.component';
import { VendedorComponent } from './components/vendedor/vendedor.component';
import { ClienteComponent } from './components/cliente/cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    AlmacenistaComponent,
    VendedorComponent,
    ClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
