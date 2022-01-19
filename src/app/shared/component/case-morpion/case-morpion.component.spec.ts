import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseMorpionComponent } from './case-morpion.component';

describe('CaseMorpionComponent', () => {
  let component: CaseMorpionComponent;
  let fixture: ComponentFixture<CaseMorpionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseMorpionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseMorpionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
