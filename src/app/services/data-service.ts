import {Injectable, NgModule} from "@angular/core";
import {Ticket} from "../rest-objects/ticket";
import {Category} from "../rest-objects/category";
import {RestService} from "./rest-service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {SideBarService} from "./side-bar-service";

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

  public restService;
  public sideBarService;

  constructor(public http: HttpClient) {
    this.restService = new RestService(http, this);
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

  public redirect(path: string) {
    window.location.href = path;
  }

  public getCategories() {
    return this.categories.map(e => e.name!).sort();
  }

  public getTickets() {
    return this.tickets;
  }

  public getTicketById(id: number) {
    return this.tickets[id];
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
}
