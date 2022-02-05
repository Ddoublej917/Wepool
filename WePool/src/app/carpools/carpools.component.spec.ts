import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpoolsComponent } from './carpools.component';

describe('CarpoolsComponent', () => {
  let component: CarpoolsComponent;
  let fixture: ComponentFixture<CarpoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarpoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarpoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
