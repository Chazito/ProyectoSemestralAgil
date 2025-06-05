import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarUbicacionPage } from './editar-ubicacion.page';

describe('EditarUbicacionPage', () => {
  let component: EditarUbicacionPage;
  let fixture: ComponentFixture<EditarUbicacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarUbicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
