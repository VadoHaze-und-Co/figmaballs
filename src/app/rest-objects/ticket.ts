export class Ticket {

  constructor(public id?: number,
              public title?: string,
              public description?: string,
              public status: number = 0,
              public creationDate?: number,
              // public finishDate?: Date,
              public appends?: number[],
              public categories?: number[]) {
  }
}
