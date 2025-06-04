import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarBodegaPage } from './agregar-bodega.page';

describe('AgregarBodegaPage', () => {
  let component: AgregarBodegaPage;
  let fixture: ComponentFixture<AgregarBodegaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarBodegaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
