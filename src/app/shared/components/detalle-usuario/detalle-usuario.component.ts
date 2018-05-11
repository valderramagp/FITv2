import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'detalle-usuario-component',
  templateUrl: './detalle-usuario.component.html'
})
export class DetalleUsuarioComponent implements OnInit {
  user: any;
  rounds: any[5] = new Array(5);

  constructor(public modal: BsModalRef) { }

  ngOnInit() {
  }

}
