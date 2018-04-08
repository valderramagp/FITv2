import { FormGroup } from "@angular/forms";

export class Round {
	descripcion: Descripcion;
	retos: Array<Reto>;
	activo: boolean;
}

export class Descripcion {
	nombre: string;
	contenido: string;
	numero: number;
}

export class Reto {
	nombre: string;
	niveles: Nivel[];
	form: FormGroup;
}

export class Nivel {
	dias: Array<Dia>;
	titulo: string;
}

export class Dia {
	reto: string;
}