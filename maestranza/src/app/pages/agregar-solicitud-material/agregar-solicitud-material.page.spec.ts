import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarSolicitudMaterialPage } from './agregar-solicitud-material.page';

describe('AgregarSolicitudMaterialPage', () => {
  let component: AgregarSolicitudMaterialPage;
  let fixture: ComponentFixture<AgregarSolicitudMaterialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarSolicitudMaterialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
