import { ErrorHandler, Injectable, Injector, forwardRef, ReflectiveInjector, Inject } from '@angular/core';
import { LoaderService } from "../loader.service";
import { ModalOutputService } from "../modal-output.service";
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from '../user.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
	constructor(private injector: Injector) {}

	handleError(error: any) {
		try {
			if (error.name == "FirebaseError" && error.message == "Missing or insufficient permissions.") return;
			if (!environment.production) console.log(error);
			let loader = this.injector.get(LoaderService);
			let modalOutput = this.injector.get(ModalOutputService);
			let db = this.injector.get(AngularFirestore);
			let profileService = this.injector.get(UserService);
			loader.stop();
			modalOutput.showError();
			let suscrption = profileService.$profile.last().subscribe((profile) => {
				if(!profile) return;
				let customError = {
					errorMessage: error.message,
					stack: error.stack,
					date: Date.now(),
					user: profile.usuario
				};
				db.collection("log").add(customError);
			});
		} catch(error) {
			console.log(error);
		}
	}
}