import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarProyectoPage } from './listar-proyecto.page';

describe('ListarProyectoPage', () => {
  let component: ListarProyectoPage;
  let fixture: ComponentFixture<ListarProyectoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProyectoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
