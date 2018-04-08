import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class LoaderService {
	private showLoader = new Subject<boolean>()
	$loader = this.showLoader.asObservable();
	constructor() { }

	start() {
		document.getElementsByTagName("body")[0].classList.add("modal-open");
		this.showLoader.next(true);
	}

	stop() {
		this.showLoader.next(false);
		document.getElementsByTagName("body")[0].classList.remove("modal-open");
	}
}
