import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuestoComponent } from './puesto.component';

describe('PuestoComponent', () => {
  let component: PuestoComponent;
  let fixture: ComponentFixture<PuestoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PuestoComponent]
    });
    fixture = TestBed.createComponent(PuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
