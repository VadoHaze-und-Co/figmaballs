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
  public users: User[] = this.dataService.getUsers();
  public categorys = this.dataService.getFullCategories();
  qualifikationen = ['Qualifikation 1', 'Qualifikation 2', 'Qualifikation 3'];
  @ViewChild('inputFile') inputFile: ElementRef | undefined;
  public selectedQualifikationen = [];
  triggerClick() {
    // @ts-ignore
    this.inputFile.nativeElement.click();
  }

  constructor(public dataService: DataService) {
   dataService.restService.loadUsers();
   dataService.restService.loadCategories();
  }
  ngOnInit() {
    //this.createUser();
}
  public user: User = new User();

  handleFileInput(files: EventTarget | null) {
    debugger
    // @ts-ignore
    let file = files.files.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      // @ts-ignore
      document.getElementById('image-file').src = event.target.result;
      this.user.profilPicture! = event.target.result;
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

  selectUser(user: User) {
    this.user = user;
    // @ts-ignore
    this.selectedQualifikationen = this.selectedQualifikationen.concat(this.user.qualifikation);
    // @ts-ignore
    document.getElementById('image-file').src = this.user.profilPicture!;
    console.log(this.categorys)
    console.log(this.user);
  }

  onCheckboxChange(event: any, id: number | undefined) {
    if (id != null) {
    if (event.target.checked) {
      console.log(id);
        this.user.qualifikation?.push(id);
      // @ts-ignore
      this.selectedQualifikationen.push(id);
    } else {
      // @ts-ignore
      const index = this.selectedQualifikationen.indexOf(id);
      if (index !== -1) {
        this.selectedQualifikationen.splice(index, 1);
        this.user.qualifikation?.splice(index, 1);
      }
    }
  //  this.user.qualifikation = this.selectedQualifikationen;
      console.log(this.user);
    }
  }
  saveUser() {
    this.dataService.restService.updateUser(this.user);
  }

  getQualificationNames(user: User) {
    return user.qualifikation?.map((value: number | undefined) => {
      return this.categorys.find(category => category.id === value)?.name;
    }).join(', ');
  }

  deleteUser(user: User) {
    if (window.confirm('Wollen Sie den Benutzer wirklich löschen?')) {
    this.dataService.restService.deleteUser(this.user.id!);
    }
  }
}
