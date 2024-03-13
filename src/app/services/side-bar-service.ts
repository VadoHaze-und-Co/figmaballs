import {HttpClient} from "@angular/common/http";
import {RestService} from "./rest-service";
import {DataService} from "./data-service";

export class SideBarService {

  private _sideBarWidth = window.innerWidth * .2;
  private _sideBarWidth_ = 0;

  public fix = false;
  private dragging = false;

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
    if (x < 150) {
      this.fix = true;
      x = 2;
    }
    let width = window.innerWidth - 555;
    if (x > width) {
      x = width;
    }
    this._sideBarWidth = x;
  }

  public moveMouse(event: any) {
    if (!this.dragging) {
      return;
    }
    event.cursor = 'col-resize';
    this.fix = false;
    this.sideBarWidth = event.x;
    this._sideBarWidth_ = this._sideBarWidth;
  }

  public dblclick() {
    if (this.fix) {
      this.sideBarWidth = this._sideBarWidth_;
      this.fix = false;
    } else {
      this.sideBarWidth = 1;
      this.fix = true;
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
