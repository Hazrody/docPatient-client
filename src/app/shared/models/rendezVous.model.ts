export class RendezVous {
  id: number;
  uidClient: string;

  nameDoctor: string;

  description: string;
  date: Date;


  constructor(id: number, uidClient: string, nameDoctor: string, description: string, date: Date) {
    this.id = id;
    this.uidClient = uidClient;
    this.nameDoctor = nameDoctor;
    this.description = description;
    this.date = date;
  }
}
