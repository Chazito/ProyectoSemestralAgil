import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarProyectoPage } from './agregar-proyecto.page';

describe('AgregarProyectoPage', () => {
  let component: AgregarProyectoPage;
  let fixture: ComponentFixture<AgregarProyectoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarProyectoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
