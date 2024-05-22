export class User {
    constructor(public id?: number,
                public userName?: string,
                public firstName?: string,
                public lastName?: string,
                public emailAddress?: string,
                public address?: string,
                public postcode?: string,
                public city?: string,
                public profilPicture?: string,
                //public bild?: string,
                public qualifikation?: number[],
                public admin?: boolean) {
    }
}
