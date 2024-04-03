import {Injectable, Type} from "@angular/core";
import {Ticket} from "../rest-objects/ticket";

@Injectable({providedIn: "root"})
export class DataService {

  // Running data
  public tickets: Ticket[] = [];

  public categories: string[] = ["Vertrieb", "Marketing", "Finanzen", "Personalwesen", "Kundendienst", "Forschung und Entwicklung", "Produktion", "Einkauf", "Qualitätskontrolle", "IT (Informationstechnologie)", "Recht", "Logistik", "Geschäftsentwicklung", "Öffentlichkeitsarbeit", "Projektmanagement", "Facility Management", "Compliance", "Risikomanagement", "Humanressourcen", "Beschaffung", "Buchhaltung", "Verwaltung", "Technischer Support", "Design und Kreativität", "Werbung", "Produktmanagement", "Lagerhaltung", "Datenschutz", "Umweltmanagement", "Schulung und Entwicklung", "Unternehmenskommunikation", "Interne Revision", "Geschäftsanalyse", "Gesundheit und Sicherheit", "Vertragsmanagement", "Informationssicherheit", "Softwareentwicklung", "Hardwareentwicklung", "Unternehmensstrategie", "Wissensmanagement", "Verkaufsförderung", "Kundenbeziehungsmanagement", "Produktionsplanung", "Lieferkettenmanagement", "Innovationsmanagement", "Kundenbindung", "Geschäftspartnerschaften", "F & E-Beratung", "Geschäftsprozessoptimierung", "Projektsteuerung und -überwachung"];

  public width() {
    return window.innerWidth;
  }

  public height() {
    return window.innerHeight;
  }
}
