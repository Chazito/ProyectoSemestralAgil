import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarMovimientosPage } from './listar-movimientos.page';

describe('ListarMovimientosPage', () => {
  let component: ListarMovimientosPage;
  let fixture: ComponentFixture<ListarMovimientosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarMovimientosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
