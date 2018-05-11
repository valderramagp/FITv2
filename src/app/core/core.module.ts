import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth-guard.service';
import { LoginGuard } from './login-guard.service';
import { UserService } from './user.service';
import { LoaderService } from './loader.service';
import { ModalErrorComponent } from './components/modal-error/modal-error.component';
import { ModalOutputService } from './modal-output.service';
import { AdminGuard } from './admin-guard.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ModalErrorComponent],
  entryComponents: [ModalErrorComponent]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
          AuthGuard,
          LoginGuard,
          AdminGuard,
          UserService,
          LoaderService,
          ModalOutputService
      ]
    }
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. import it in the AppModule only!');
    }
  }
}
