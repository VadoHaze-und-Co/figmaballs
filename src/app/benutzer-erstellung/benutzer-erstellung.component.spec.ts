import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenutzerErstellungComponent } from './benutzer-erstellung.component';

describe('BenutzerErstellungComponent', () => {
  let component: BenutzerErstellungComponent;
  let fixture: ComponentFixture<BenutzerErstellungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BenutzerErstellungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BenutzerErstellungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
