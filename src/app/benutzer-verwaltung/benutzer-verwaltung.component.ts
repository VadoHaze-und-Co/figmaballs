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
}
