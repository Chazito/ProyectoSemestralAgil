import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonInput,
  IonSearchbar,
  IonAccordion,
  IonAccordionGroup,
  IonCheckbox, IonIcon, IonCardContent, IonCard, IonAvatar, IonCardSubtitle, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { FirebaseServiceService, Proyectos, Usuario } from 'src/app/services/firebase-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-agregar-proyecto',
  templateUrl: './agregar-proyecto.page.html',
  styleUrls: ['./agregar-proyecto.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardHeader, IonCardSubtitle, IonAvatar, IonCard, IonCardContent, IonIcon, 
    IonCheckbox,
    IonAccordionGroup,
    IonAccordion,
    IonSearchbar,
    IonInput,
    IonList,
    IonLabel,
    IonItem,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule
  ]
})
export class AgregarProyectoPage implements OnInit {
  usuario: any[] = [];
  productos: any[] = [];
  productosFiltrados: any[] = [];
  usuariosFiltrados: any[] = [];

  // Datos del formulario
  nombre: string = '';
  fecha: string = '';

  constructor(
    private router: Router,
    private fireService: FirebaseServiceService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.cargarDatos();
  }
  contarUsuariosSeleccionados(): number {
  return this.usuariosFiltrados.filter(usuario => usuario.seleccionado).length;
}

contarProductosSeleccionados(): number {
  return this.productosFiltrados.filter(producto => producto.seleccionado).length;
}

  private cargarDatos() {
    // Cargar usuarios
    this.fireService.getUsuarios().subscribe({
      next: (data) => {
        this.usuario = data.map((user: Usuario) => ({ 
          ...user, 
          seleccionado: false 
        }));
        this.usuariosFiltrados = [...this.usuario];
        console.log('Usuarios cargados:', this.usuario);
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        alert('Error al cargar la lista de usuarios');
      }
    });

    // Cargar productos
    this.fireService.getProductos().subscribe({
      next: (data) => {
        this.productos = data.map((prod: any) => ({ 
          ...prod, 
          seleccionado: false 
        }));
        this.productosFiltrados = [...this.productos];
        console.log('Productos cargados:', this.productos);
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        alert('Error al cargar la lista de productos');
      }
    });
  }

  filtrarProductos(event: any) {
    const texto = event.target.value?.toLowerCase() || '';
    this.productosFiltrados = this.productos.filter(producto =>
      producto.nombre?.toLowerCase().includes(texto)
    );
  }

  filtrarUsuarios(event: any) {
    const texto = event.target.value?.toLowerCase() || '';
    this.usuariosFiltrados = this.usuario.filter(user =>
      user.nombre?.toLowerCase().includes(texto)
    );
  }

  // Métodos para manejar selección
  toggleUsuario(index: number) {
    const usuarioIndex = this.usuario.findIndex(u => u.id === this.usuariosFiltrados[index].id);
    if (usuarioIndex !== -1) {
      this.usuario[usuarioIndex].seleccionado = !this.usuario[usuarioIndex].seleccionado;
      // Actualizar también en la lista filtrada
      this.usuariosFiltrados[index].seleccionado = this.usuario[usuarioIndex].seleccionado;
    }
  }

  toggleProducto(index: number) {
    const productoIndex = this.productos.findIndex(p => p.id === this.productosFiltrados[index].id);
    if (productoIndex !== -1) {
      this.productos[productoIndex].seleccionado = !this.productos[productoIndex].seleccionado;
      // Actualizar también en la lista filtrada
      this.productosFiltrados[index].seleccionado = this.productos[productoIndex].seleccionado;
    }
  }

  // Getters para obtener seleccionados
  get empleadosSeleccionados() {
    return this.usuario.filter(u => u.seleccionado);
  }

  get productosSeleccionados() {
    return this.productos.filter(p => p.seleccionado);
  }

  cancelar() {
    this.limpiarFormulario();
    this.router.navigate(['/listar-proyecto']);
  }

  limpiarFormulario() {
    this.nombre = '';
    this.fecha = '';
    
    // Limpiar selecciones
    this.usuario.forEach(u => u.seleccionado = false);
    this.productos.forEach(p => p.seleccionado = false);
    this.usuariosFiltrados.forEach(u => u.seleccionado = false);
    this.productosFiltrados.forEach(p => p.seleccionado = false);
  }

  async agregarProyecto() {
    console.log('Iniciando validaciones...');
    console.log('Nombre:', this.nombre);
    console.log('Fecha:', this.fecha);
    console.log('Usuarios seleccionados:', this.empleadosSeleccionados);
    console.log('Productos seleccionados:', this.productosSeleccionados);

    // Validaciones básicas
    if (!this.nombre?.trim()) {
      alert('Por favor ingresa el nombre del proyecto');
      return;
    }

    if (this.nombre.trim().length < 3) {
      alert('El nombre del proyecto debe tener al menos 3 caracteres');
      return;
    }

    if (!this.fecha || this.fecha.trim() === '') {
      alert('Por favor selecciona una fecha para el proyecto');
      return;
    }

    // Validar formato de fecha
    const fechaValida = /^\d{4}-\d{2}-\d{2}$/.test(this.fecha);
    if (!fechaValida) {
      alert('Formato de fecha inválido. Usa el formato AAAA-MM-DD');
      return;
    }

    // Validar que la fecha no sea anterior a hoy
    const fechaProyecto = new Date(this.fecha);
    const fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0);
    
    if (fechaProyecto < fechaHoy) {
      alert('La fecha del proyecto no puede ser anterior a hoy');
      return;
    }

    // Validar empleados seleccionados
    const empleadosSeleccionados = this.empleadosSeleccionados;
    if (empleadosSeleccionados.length === 0) {
      alert('Debes seleccionar al menos un empleado para el proyecto');
      return;
    }

    // Validar productos seleccionados
    const productosSeleccionados = this.productosSeleccionados;
    if (productosSeleccionados.length === 0) {
      alert('Debes seleccionar al menos un producto para el proyecto');
      return;
    }

    // Crear objeto del proyecto
    const proyectoData: Proyectos = {
      nombre: this.nombre.trim(),
      fecha: this.fecha,
      empleados: empleadosSeleccionados.map(e => e.nombre),
      materiales: productosSeleccionados.map(p => p.nombre)
    };

    console.log('Datos del proyecto a guardar:', proyectoData);

    try {
      await this.fireService.agregarProyecto(proyectoData);
      alert('Proyecto agregado correctamente');
      this.limpiarFormulario();
      this.router.navigate(['/listar-proyecto']); // Navegación consistente
    } catch (error) {
      console.error('Error al guardar proyecto:', error);
      alert('Hubo un error al guardar el proyecto. Revisa la consola para más detalles.');
    }
  }
}