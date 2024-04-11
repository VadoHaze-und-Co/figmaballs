import {Component, inject, TemplateRef} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ModalDismissReasons, NgbModal, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {DataService} from "../services/data-service";
import {Ticket} from "../rest-objects/ticket";
import {ActivatedRoute, Router} from "@angular/router";

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
  public ticket: Ticket | undefined;
  public id: number | undefined;
  found = true;
  showSaveSuccess = false;

  constructor(public dataService: DataService, private router: ActivatedRoute) {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.getRequiredDataFromParams();
    if (this.id != undefined) {
      this.ticket = this.dataService.restService.loadTicket(this.id);
    }
  }

  private getRequiredDataFromParams() {
    const routeParams = this.router.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));
    const routeQueries = this.router.snapshot.queryParamMap;
    if (routeQueries.has('saveSuccess')) {
      this.showSaveSuccess = routeQueries.get('saveSuccess') === 'true';
    }
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

  editTicket(id: number | undefined) {
    /*if (id != undefined) {
      this.router.navigateByUrl('/ticket/edit/' + id);
    }*/
  }

  closeTicket(id: number | undefined) {

  }

  setAssignation(id:number,userId:number) {

  }

  setStatus(id:number,status:number) {

  }

  deleteTicket(id: number | undefined) {

  }
}
