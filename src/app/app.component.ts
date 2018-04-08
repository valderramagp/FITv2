import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { LoaderService } from './core/loader.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-root',
	template: `
		<router-outlet></router-outlet>
		<div class='loader-container' [class.visible]='$loader | async' >
			<div class='loader'></div>
		</div>
	`
})
export class AppComponent implements OnInit {
	$loader: Observable<boolean>;
	constructor(private loader: LoaderService) { }

	ngOnInit() {
		this.$loader = this.loader.$loader
	}
}
