export class TodoModel {

  id: string;
  nombre: string;
  descripcion: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  estado: boolean;

  constructor() {
      this.estado = true;
      this.fechaCreacion = new Date();
  }

}
