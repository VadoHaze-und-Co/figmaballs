import { Component } from '@angular/core';
import {DeviceDetectorService} from "ngx-device-detector";
import {NgIf} from "@angular/common";
import {DataService} from "../services/data-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(public deviceService: DeviceDetectorService, public dataService: DataService, private router: Router) {
  }

  public isMobile() {
    return this.deviceService.isMobile();
  }

  public h() {
    this.dataService.h();
  }

  public goToLogin() {
    this.router.navigateByUrl('/login');
  }

  public logout() {
    this.dataService.tickets = [];
    this.dataService.restService.logout();
    this.router.navigateByUrl('/login');
  }
}
