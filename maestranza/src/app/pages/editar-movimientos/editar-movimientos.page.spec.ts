import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarMovimientosPage } from './editar-movimientos.page';

describe('EditarMovimientosPage', () => {
  let component: EditarMovimientosPage;
  let fixture: ComponentFixture<EditarMovimientosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarMovimientosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
