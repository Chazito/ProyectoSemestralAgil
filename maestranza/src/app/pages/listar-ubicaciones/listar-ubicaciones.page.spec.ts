import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarUbicacionesPage } from './listar-ubicaciones.page';

describe('ListarUbicacionesPage', () => {
  let component: ListarUbicacionesPage;
  let fixture: ComponentFixture<ListarUbicacionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarUbicacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
