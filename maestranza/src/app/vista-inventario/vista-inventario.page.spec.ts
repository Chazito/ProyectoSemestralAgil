import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaInventarioPage } from './vista-inventario.page';

describe('VistaInventarioPage', () => {
  let component: VistaInventarioPage;
  let fixture: ComponentFixture<VistaInventarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaInventarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
