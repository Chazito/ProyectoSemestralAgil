import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarProveedoresPage } from './editar-proveedores.page';

describe('EditarProveedoresPage', () => {
  let component: EditarProveedoresPage;
  let fixture: ComponentFixture<EditarProveedoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarProveedoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
