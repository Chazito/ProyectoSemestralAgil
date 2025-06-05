import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarBodegaPage } from './editar-bodega.page';

describe('EditarBodegaPage', () => {
  let component: EditarBodegaPage;
  let fixture: ComponentFixture<EditarBodegaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarBodegaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
