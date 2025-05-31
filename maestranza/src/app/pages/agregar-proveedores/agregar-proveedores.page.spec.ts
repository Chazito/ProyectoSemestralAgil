import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarProveedoresPage } from './agregar-proveedores.page';

describe('AgregarProveedoresPage', () => {
  let component: AgregarProveedoresPage;
  let fixture: ComponentFixture<AgregarProveedoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarProveedoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
