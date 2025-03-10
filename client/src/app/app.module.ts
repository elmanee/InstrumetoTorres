import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './almacenista/pages/dashboard/dashboard.component';
import { AgregarProductoComponent } from './almacenista/pages/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './almacenista/pages/editar-producto/editar-producto.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RellenarProductoComponent } from './vendedor/pages/rellenar-producto/rellenar-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AgregarProductoComponent,
    EditarProductoComponent,
    // FooterComponent,
    // ReactiveFormsModule,
    // HttpClient,
    // RellenarProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
