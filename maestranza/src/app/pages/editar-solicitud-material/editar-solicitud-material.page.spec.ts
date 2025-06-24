import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarSolicitudMaterialPage } from './editar-solicitud-material.page';

describe('EditarSolicitudMaterialPage', () => {
  let component: EditarSolicitudMaterialPage;
  let fixture: ComponentFixture<EditarSolicitudMaterialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSolicitudMaterialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
