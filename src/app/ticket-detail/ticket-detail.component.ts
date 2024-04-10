import {Component, inject, TemplateRef} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.css'
})
export class TicketDetailComponent {
  /*private modalService = inject(NgbModal);
  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }*/
}
