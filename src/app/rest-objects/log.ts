import {timestamp} from "rxjs";

export class Log {
  constructor(public user?: string,
              public object?: string,
              public action?: string,
              public message?: string,
              public timestamp?: string) {
  }

  public time() {
    let year = this.timestamp?.substring(0, 4);
    let month = this.timestamp?.substring(5, 7);
    let day = this.timestamp?.substring(8, 10);

    let time = this.timestamp?.substring(11, 22);

    let date = day + "." + month + "." + year;

    return date + " " + time;
  }
}
