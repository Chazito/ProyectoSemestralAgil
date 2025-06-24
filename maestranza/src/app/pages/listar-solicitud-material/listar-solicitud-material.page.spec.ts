import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarSolicitudMaterialPage } from './listar-solicitud-material.page';

describe('ListarSolicitudMaterialPage', () => {
  let component: ListarSolicitudMaterialPage;
  let fixture: ComponentFixture<ListarSolicitudMaterialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSolicitudMaterialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
