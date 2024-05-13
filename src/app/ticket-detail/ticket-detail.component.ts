import {Component, inject, TemplateRef} from '@angular/core';
import {DatePipe, formatDate, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
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
import {TicketComment} from "../rest-objects/ticket_comment";
import _default from "chart.js/dist/core/core.interaction";
import {User} from "../rest-objects/user";

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
    RouterLink,
    NgForOf,
    DatePipe
  ],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.css'
})

export class TicketDetailComponent {
  private modalService = inject(NgbModal);
  closeResult = '';
  public ticket: Ticket | undefined;
  public users = this.dataService.getUsers();
  public comments: TicketComment[] = [];
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
    this.dataService.restService.loadComments();
    if (this.id != undefined) {
      const ticketId = this.id;
      this.comments = this.dataService.getComments().sort(a => a.ticketId = ticketId);
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

  private getCommentsFromTicket() {

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

  getUser(id?: Number): User {
    return <User>this.users.find(user => user.id === id);
  }
}
