import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AgregarProductoComponent } from './almacenista/pages/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './almacenista/pages/editar-producto/editar-producto.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AgregarProductoComponent,
    EditarProductoComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
