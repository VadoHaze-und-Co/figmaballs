import { NgForOf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-benutzer-verwaltung',
  standalone: true,
  imports: [FormsModule, NgForOf],
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

  handleFileInput(files: EventTarget | null) {
    debugger
    // @ts-ignore
    let file = files.files.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      // @ts-ignore
      document.getElementById('image-file').src = event.target.result;
    }
    // @ts-ignore
    reader.readAsDataURL(file);
  }
  getSelectedQualifikationen(): string[] {
    const checkboxes = document.querySelectorAll('.dropdown-content input[type="checkbox"]:checked');
    // @ts-ignore
    const selectedQualifikationen = Array.from(checkboxes, (checkbox: HTMLInputElement) => checkbox.value);
    return selectedQualifikationen;
  }

  saveUser() {
    let benutzername = (<HTMLInputElement>document.getElementById('benutzername')).value;
    let vorname = (<HTMLInputElement>document.getElementById('vorname')).value;
    let nachname = (<HTMLInputElement>document.getElementById('nachname')).value;
    let anschrift = (<HTMLInputElement>document.getElementById('anschrift')).value;
    let stadt = (<HTMLInputElement>document.getElementById('stadt')).value;
    let plz = (<HTMLInputElement>document.getElementById('plz')).value;
    let qualifikation =this.getSelectedQualifikationen()
    let isAdmin = (<HTMLInputElement>document.getElementById('isAdmin')).checked;
    let benutzer = { benutzername, vorname, nachname, anschrift, stadt, plz, qualifikation, isAdmin };
    console.log(benutzer);
  }
}
