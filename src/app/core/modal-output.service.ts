import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ModalErrorComponent } from './components/modal-error/modal-error.component';
import { Subscription } from 'rxjs';

@Injectable()
export class ModalOutputService {
  isOpen: boolean;
  constructor(private bsModal: BsModalService) { }

  showError(title: string = '¡Ocurrió un error inesperado!', subtitle?: string) {
    if (!this.isOpen) {
      this.isOpen = true;
      let modal = this.bsModal.show(ModalErrorComponent);
      modal.content.title = title;
      modal.content.subtitle = subtitle;
      let suscription: Subscription = this.bsModal.onHidden.subscribe(t => {
        suscription.unsubscribe();
        this.isOpen = false;
      });
    }
  }
}
