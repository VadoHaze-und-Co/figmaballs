import {Component, inject, TemplateRef} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {
  ModalDismissReasons,
  NgbDropdown, NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle,
  NgbModal,
  NgbTooltip
} from "@ng-bootstrap/ng-bootstrap";
import {DataService} from "../services/data-service";
import {Ticket} from "../rest-objects/ticket";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Append} from "../rest-objects/append";

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgbTooltip,
    NgIf,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdownItem,
    RouterLink
  ],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.css'
})

export class TicketDetailComponent {
  private modalService = inject(NgbModal);
  closeResult = '';
  public ticket: Ticket | undefined;
  public id: number | undefined;
  public appends: Append[] | undefined;
  found = true;
  showSaveSuccess = false;

  constructor(public dataService: DataService, private router: ActivatedRoute, private route: Router) {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.getRequiredDataFromParams();
    if (this.id != undefined) {
      this.getTicket(this.id);
    }
  }
  private getTicket(id: number) {
    this.dataService
      .restService.loadTicket(id)
      .then((ticket) => (this.ticket = ticket))
      .catch(() => (this.found = false));
  }

  private getRequiredDataFromParams() {
    const routeParams = this.router.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));
    const routeQueries = this.router.snapshot.queryParamMap;
    if (routeQueries.has('saveSuccess')) {
      this.showSaveSuccess = routeQueries.get('saveSuccess') === 'true';
    }
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
    if (id != undefined) {
      this.getTicket(id);
      if (this.ticket != undefined) {
        this.ticket.status = 3;
        this.ticket.finishDate = Date.now();
        this.dataService.restService.updateTicket(this.ticket);
      }
    }
    window.location.reload();
  }

  setAssignation(id:number,userId:number) {

  }

  setStatus(id:number|undefined,status:number) {
    //console.log("read successfully: Status selected: " + status + " and id: " + id);
    if (id != undefined) {
      this.getTicket(id);
      if (this.ticket != undefined) {
        this.ticket.status = status;
        this.id = this.ticket.id;
        this.dataService.restService.updateTicket(this.ticket);
      }
    }
    window.location.reload();
  }

  deleteTicket(id: number | undefined) {

  }

  setPriority(id: number | undefined, priority: number) {
    if (id != undefined) {
      this.getTicket(id);
      if (this.ticket != undefined) {
        this.ticket.priority = priority;
        this.id = this.ticket.id;
        this.dataService.restService.updateTicket(this.ticket);
      }
    }
    window.location.reload();
  }
}
