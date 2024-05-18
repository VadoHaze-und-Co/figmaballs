export class Ticket {

  constructor(public id?: number,
              public title?: string,
              public description?: string,
              public status?: number,
              public priority?: number,
              public creationDate?: number,
              public finishDate?: number,
              public appends?: number[],
              public categories?: number[],
              public comments?: number[]) {
  }
}
