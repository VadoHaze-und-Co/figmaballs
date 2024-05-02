export class User {
    constructor(public benutzername?: string,
                public vorname?: string,
                public nachname?: string,
                public anschrift?: string,
                public stadt?: string,
                public email?: string,
                public plz?: string,
                public bild?: string,
                public qualifikation?: string[],
                public isAdmin?: boolean) {
    }
}