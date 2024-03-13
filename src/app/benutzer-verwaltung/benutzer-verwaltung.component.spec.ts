import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenutzerVerwaltungComponent } from './benutzer-verwaltung.component';

describe('BenutzerVerwaltungComponent', () => {
  let component: BenutzerVerwaltungComponent;
  let fixture: ComponentFixture<BenutzerVerwaltungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BenutzerVerwaltungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BenutzerVerwaltungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
