import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Puissance4Component } from './puissance4.component';

describe('Puissance4Component', () => {
  let component: Puissance4Component;
  let fixture: ComponentFixture<Puissance4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Puissance4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Puissance4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
