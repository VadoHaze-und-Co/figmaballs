import {HttpClient} from "@angular/common/http";
import {RestService} from "./rest-service";
import {DataService} from "./data-service";

export class SideBarService {

  private _sideBarWidth = window.innerWidth * .2;
  private _sideBarWidth_ = 200;

  public _fix = false;
  public dragging = false;

  constructor(public dataService: DataService) {
    let localSideBarWidth = localStorage.getItem("sideBarWidth");
    if (localSideBarWidth !== null) {
      this.sideBarWidth = parseInt(localSideBarWidth);
    }
  }

  public get sideBarWidth() {
    return this._sideBarWidth;
  }

  public set sideBarWidth(sideBarWidth) {
    let x = sideBarWidth;
    if (x == 0) {
      return;
    }
    let min = 200;
    let max = window.innerWidth - 555;
    if ((x > min && x < min + 5) || (x < min && x > min / 2)) {
      x = min;
    }
    if (x < min - 1) {
      x = 2;
      this.sideBarWidth_ = this._sideBarWidth;
      this._fix = true;
    } else {
      this._fix = false;
    }
    if (x > max) {
      x = max;
    }
    this._sideBarWidth = x;
  }

  private set sideBarWidth_(sideBarWidth: number) {
    let x = sideBarWidth;
    let min = 200;
    let max = window.innerWidth - 555;
    if (x > max) {
      x = max;
    }
    if (x < min) {
      x = min;
    }
    this._sideBarWidth_ = x;
  }

  public moveMouse(event: any) {
    if (!this.dragging) {
      return;
    }
    event.cursor = 'col-resize';
    this.sideBarWidth = event.x;
  }

  public set fixx(fix: boolean) {
    this._fix = fix;
    if (fix) {
      this.sideBarWidth = 1;
    } else {
      this.sideBarWidth = this._sideBarWidth_;
    }
  }

  up() {
    localStorage.setItem("sideBarWidth", this.sideBarWidth.toString())
    this.dragging = false;
  }

  down() {
    this.dragging = true;
  }
}
