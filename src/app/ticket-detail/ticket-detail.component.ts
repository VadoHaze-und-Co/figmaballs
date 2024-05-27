import {Component, ElementRef, inject, TemplateRef, ViewChild} from '@angular/core';
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
import {User} from "../rest-objects/user";
import {FormBuilder, FormsModule} from "@angular/forms";

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
    DatePipe,
    FormsModule
  ],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.css'
})

export class TicketDetailComponent {
  private modalService = inject(NgbModal);
  closeResult = '';
  public ticket: Ticket | undefined;
  public users = this.dataService.getUsers();
  public id: number | undefined;
  public appends: Append[] | undefined;
  public comments: TicketComment[] = this.dataService.getComments();
  found = true;
  showSaveSuccess = false;
  public commentText: string | undefined;
  public user: User = new User();
  @ViewChild('editableComment') editableComment: ElementRef | undefined;
  @ViewChild('nonEditableComment') nonEditableComment: ElementRef | undefined;
  //commentUsers: Map<number,string> = new Map<number, string>();

  constructor(public dataService: DataService, private router: ActivatedRoute, private route: Router) {
    this.getRequiredDataFromParams();
    this.getTicket(this.id!);
    this.dataService.restService.loadUsers();
    this.dataService.restService.loadComments();
  }

  private getTicket(id: number) {
    this.dataService
      .restService.loadTicket(id)
      .then((ticket) => {
        (this.ticket = ticket);
        this.loadAppends();
      })
      .catch(() => (this.found = false));
  }

  public async loadAppends() {
    this.appends = [];
    for (let id of this.ticket!.appends!) {
      this.appends.push(await this.dataService.restService.getAppend(id));
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

  setAssigment(ticketId: number | undefined, userId: number) {
    if (ticketId != undefined) {
      this.getTicket(ticketId);
      if (this.ticket != undefined) {
        this.ticket.assignment = userId!;
        this.id = this.ticket.id;
        this.dataService.restService.updateTicket(this.ticket);
      }
    }
    window.location.reload();
  }

  addComment(edit: boolean) {
    if (this.commentText !== undefined) {
      console.log("Comment: " + this.commentText)
      const entity: TicketComment = new TicketComment();
      entity.comment = this.commentText;
      entity.ticketId = this.id;
      entity.userId = this.dataService.getAccountUserId();
      entity.edited = false;
      entity.commentDate = Date.now();
      this.dataService.restService.createComment(entity);
    }
    window.location.reload();
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

  getUserFromList(userId: number): User {
    return this.users.find(u => u.id == userId)!;
  }

  getUserFromAccount(userId: number) {
    this.dataService.restService.loadUser(userId).then((user: User) => {(this.user = user)});
  }

  downloadFile(append: Append) {
    const blob = new Blob([append.content!], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = append.fileName! + "." + append.fileType!;
    link.click();
  }

  editComment(commentId: number) {
    this.nonEditableComment!.nativeElement.hidden = true;
    this.editableComment!.nativeElement.hidden = false;
  }

  deleteComment(commentId: number) {
    this.dataService.restService.deleteComment(this.comments.find(c => c.id == commentId)!);
    window.location.reload();
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
    this.dataService.restService.deleteTicket(id!);
    window.location.href = "";
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

  protected readonly User = User;
  protected readonly Date = Date;

  reopenTicket(id: number | undefined) {
    if (id) {
      this.getTicket(id);
      if (this.ticket != undefined) {
        this.ticket.status = 1;
        this.ticket.finishDate = undefined;
        this.dataService.restService.updateTicket(this.ticket);
      }
    }
    window.location.reload();
  }
}
