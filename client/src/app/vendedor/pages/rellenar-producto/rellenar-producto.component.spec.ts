import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RellenarProductoComponent } from './rellenar-producto.component';

describe('RellenarProductoComponent', () => {
  let component: RellenarProductoComponent;
  let fixture: ComponentFixture<RellenarProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RellenarProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RellenarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
