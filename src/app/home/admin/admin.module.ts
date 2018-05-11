import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DetalleUsuarioModule } from '../../shared/components/detalle-usuario/detalle-usuario.module';
import { DetalleUsuarioComponent } from '../../shared/components/detalle-usuario/detalle-usuario.component';

@NgModule({
  imports: [
    CommonModule,
    DetalleUsuarioModule
  ],
  declarations: [AdminComponent],
  entryComponents: [ DetalleUsuarioComponent ]
})
export class AdminModule { }
