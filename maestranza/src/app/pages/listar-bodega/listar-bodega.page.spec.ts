import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarBodegaPage } from './listar-bodega.page';

describe('ListarBodegaPage', () => {
  let component: ListarBodegaPage;
  let fixture: ComponentFixture<ListarBodegaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarBodegaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
