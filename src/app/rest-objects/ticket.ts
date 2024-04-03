export class Ticket {

  constructor(public id?: number,
              public description?: string,
              public status?: number,
              public creationDate?: Date,
              public finishDate?: Date,
              public appends?: number[],
              public categories?: number[]) {
  }
}
