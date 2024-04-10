import {Component, inject, TemplateRef, ViewEncapsulation} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ModalDismissReasons, NgbModal, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {DataService} from "../services/data-service";
import {Ticket} from "../rest-objects/ticket";

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgbTooltip
  ],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.css'
})

export class TicketDetailComponent {
  private modalService = inject(NgbModal);
  closeResult = '';
  public ticket = this.dataService.getTicket(1);

  constructor(public dataService: DataService) {
    dataService.restService.loadTicket(1);
  }
  public getTicket(id: number) : Ticket | null {
    return this.dataService.ticket;
  }
  open(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'xl', centered: true, scrollable: true}).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  downloadFile() {

  }

  editTicket(id:number) {

  }

  closeTicket(id:number) {

  }

  setAssignation(id:number,userId:number) {

  }

  setStatus(id:number,status:number) {

  }

  deleteTicket(id: number) {

  }
}
