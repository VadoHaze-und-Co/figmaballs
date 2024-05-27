import {Injectable, NgModule} from "@angular/core";
import {Ticket} from "../rest-objects/ticket";
import {Category} from "../rest-objects/category";
import {RestService} from "./rest-service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {SideBarService} from "./side-bar-service";
import {TicketComment} from "../rest-objects/ticket_comment";
import {User} from "../rest-objects/user";
import {Account} from "../rest-objects/account";
import {AppComponent} from "../app.component";
import {CookieService} from "ngx-cookie-service";

@NgModule({
  imports: [HttpClientModule],
  providers: [HttpClientModule]
})
@Injectable({providedIn: "root"})
export class DataService {

  // Running data

  public tickets: Ticket[] = [];
  public ticket: Ticket = new Ticket();

  public categoriesDefault: string[] = ["Vertrieb", "Marketing", "Finanzen", "Personalwesen", "Kundendienst", "Forschung und Entwicklung", "Produktion", "Einkauf", "Qualitätskontrolle", "IT (Informationstechnologie)", "Recht", "Logistik", "Geschäftsentwicklung", "Öffentlichkeitsarbeit", "Projektmanagement", "Facility Management", "Compliance", "Risikomanagement", "Humanressourcen", "Beschaffung", "Buchhaltung", "Verwaltung", "Technischer Support", "Design und Kreativität", "Werbung", "Produktmanagement", "Lagerhaltung", "Datenschutz", "Umweltmanagement", "Schulung und Entwicklung", "Unternehmenskommunikation", "Interne Revision", "Geschäftsanalyse", "Gesundheit und Sicherheit", "Vertragsmanagement", "Informationssicherheit", "Softwareentwicklung", "Hardwareentwicklung", "Unternehmensstrategie", "Wissensmanagement", "Verkaufsförderung", "Kundenbeziehungsmanagement", "Produktionsplanung", "Lieferkettenmanagement", "Innovationsmanagement", "Kundenbindung", "Geschäftspartnerschaften", "F & E-Beratung", "Geschäftsprozessoptimierung", "Projektsteuerung und -überwachung"];
  public categories: Category[] = [];

  public users: User[] = [];

  public comments: TicketComment[] = [];

  public restService;
  public sideBarService;

  constructor(public http: HttpClient, private cookieService: CookieService) {
    this.restService = new RestService(http, this, cookieService);
    this.sideBarService = new SideBarService(this);
  }

  public h() {
    for (let category of this.categoriesDefault) {
      this.restService.createCategory(new Category(0, category));
    }
  }

  public width() {
    return window.innerWidth - this.sideBarService.sideBarWidth;
  }

  public height() {
    return window.innerHeight;
  }

  public getAccountId(): number {
    if (this.cookieService.check('account.id')) {
      return parseInt(this.cookieService.get('account.id'));
    } else {
      return 0;
    }
  }

  public getAccountUserId(): number {
    if (this.cookieService.check('account.userId')) {
      return parseInt(this.cookieService.get('account.userId'));
    } else {
      return 0;
    }
  }

  public getAutoEscalation(): boolean {
    return this.cookieService.check('auto-escalation');
  }

  public setAutoEscalation(auto: boolean) {
    if (auto) {
      this.cookieService.delete('auto-escalation');
    }
    else {
      this.cookieService.set('auto-escalation','true');
    }
  }

  public redirect(path: string) {
    window.location.href = path;
  }

  public getCategories() {
    return this.categories.map(e => e.name!).sort();
  }

  public getTickets() {
    return this.tickets;
  }

  public getUsers() {
    return this.users;
  }

  public getComments() {
    return this.comments;
  }

  public getTicketStatus(status: number | undefined): string {
    switch (status) {
      case 1:
        return "In Arbeit";
      case 2:
        return "Wird getestet";
      case 3:
        return "Abgeschlossen";
      case -1:
        return "Abgesagt";
      default:
        return "Offen";
    }
  }

  public priorityToString(priority: number | undefined): string {
    switch (priority) {
      case -2:
        return "niedrigste Priorität";
      case -1:
        return "niedriger Priorität";
      case 1:
        return "höher Priorität";
      case 2:
        return "höchste Priorität";
      default:
        return "Normal";
    }
  }

  public getCommentCountFromTicket(ticketId: number) {
    this.restService.loadComments();
    //this.comments.sort(comment => comment.ticketId == ticketId);
  }
}
