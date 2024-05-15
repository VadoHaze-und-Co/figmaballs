export class User {
  constructor(public id?: number,
              public userName?: string,
              public firstName?: string,
              public lastName?: string,
              public emailAddress?: string,
              public address?: string,
              public postcode?: string,
              public city?: string,
              public admin?: boolean,
              public userGroups?: number[],
              public comments?: number[]) {
  }
}
