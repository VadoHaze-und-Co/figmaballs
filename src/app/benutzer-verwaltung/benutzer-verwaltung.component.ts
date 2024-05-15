import { NgForOf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../rest-objects/user';
import { DataService } from '../services/data-service';
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-benutzer-verwaltung',
  standalone: true,
  imports: [FormsModule, NgForOf, NgbDropdownMenu, NgbDropdown, NgbDropdownToggle],
  templateUrl: './benutzer-verwaltung.component.html',
  styleUrl: './benutzer-verwaltung.component.css'
})
export class BenutzerVerwaltungComponent {
  qualifikationen = ['Qualifikation 1', 'Qualifikation 2', 'Qualifikation 3'];
  @ViewChild('inputFile') inputFile: ElementRef | undefined;
  triggerClick() {
    // @ts-ignore
    this.inputFile.nativeElement.click();
  }

  constructor(public dataService: DataService) {
   // dataService.restService.loadUsers();    
  }

  ngOnInit() {
    this.createUser();
}

createUser() {
    let testUser = new User();
    testUser.vorname = 'Test';
    testUser.nachname = 'Benutzer';
    testUser.anschrift = 'Teststraße 1';
    testUser.stadt = 'Teststadt';
    testUser.plz = '12345';
    testUser.email = 'test@benutzer.de';
    testUser.qualifikation = ['Qualifikation 1', 'Qualifikation 2'];
    testUser.isAdmin = false;
    let testUser2 = new User();
    testUser2.vorname = 'Test2';
    testUser2.nachname = 'Benutzer2';
    testUser2.anschrift = 'Teststraße 2';
    testUser2.stadt = 'Teststadt2';
    testUser2.plz = '12346';
    testUser2.email = 'test@benutzer2.de';
    testUser2.qualifikation = ['Qualifikation 2', 'Qualifikation 3'];
    testUser2.isAdmin = true;

    this.users.push(testUser, testUser2);
}
  
  public users: User[] = [];
  public user: User = new User();

  handleFileInput(files: EventTarget | null) {
    debugger
    // @ts-ignore
    let file = files.files.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      // @ts-ignore
      document.getElementById('image-file').src = event.target.result;
      this.user.bild = event.target.result;
    }
    // @ts-ignore
    reader.readAsDataURL(file);
  }
  getSelectedQualifikationen(): string[] {
    const checkboxes = document.querySelectorAll('.dropdownQuali input[type="checkbox"]:checked');
    // @ts-ignore
    const selectedQualifikationen = Array.from(checkboxes, (checkbox: HTMLInputElement) => checkbox.value);
    return selectedQualifikationen;
  }

  saveUser() {
    this.user.benutzername = (<HTMLInputElement>document.getElementById('benutzername')).value;
    this.user.vorname = (<HTMLInputElement>document.getElementById('vorname')).value;
    this.user.nachname = (<HTMLInputElement>document.getElementById('nachname')).value;
    this.user.anschrift = (<HTMLInputElement>document.getElementById('anschrift')).value;
    this.user.stadt = (<HTMLInputElement>document.getElementById('stadt')).value;
    this.user.plz = (<HTMLInputElement>document.getElementById('plz')).value;
    this.user.email = (<HTMLInputElement>document.getElementById('email')).value;
    this.user.qualifikation =this.getSelectedQualifikationen()
    this.user.isAdmin = (<HTMLInputElement>document.getElementById('adminCheckbox')).checked;
    this.dataService.restService.createUser(this.user);
  }

  selectUser(user: User) {
    this.user = user;
    console.log(this.user);
  }
}
