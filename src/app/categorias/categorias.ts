import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../services/categoria.services';
import { HttpClientModule } from '@angular/common/http';

export interface Categoria {
  nombre: string;
  descripcion: string;
  estado: 'activa' | 'inactiva';
  editando?: boolean;
}

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
  imports: [CommonModule, FormsModule ]
})
export class CategoriasComponent implements  OnInit {
  constructor(public categoryService: CategoriaService) {

  }
  ngOnInit(): void {
    this.categoryService.ObtenerCategorias().subscribe({
      next: (valores: any) => {
        this.categorias = valores.content.map((a:any) => ({
          nombre: a.name,
          descripcion: "aaa",
          estado: "activa",
          editando: false
        } as Categoria));
      },
      error: (error:any) => {
        console.log("err", error)
      }
    })
  }
  filtroEstado: string = 'todos';

  categorias: Categoria[] = [
   /* { nombre: 'ramen', descripcion: 'Platos de fideos japoneses', estado: 'activa' },
    { nombre: 'Bebidas', descripcion: 'Bebidas refrescantes', estado: 'activa' },
    { nombre: 'mochis', descripcion: 'Postres tradicionales', estado: 'activa' },
    { nombre: 'onigiry', descripcion: 'Arroz con relleno', estado: 'inactiva' },
    { nombre: 'helados', descripcion: 'Postres fríos', estado: 'activa' },
    { nombre: 'corn dogs', descripcion: 'Salchichas empanizadas', estado: 'activa' },
    { nombre: 'combos', descripcion: 'Combos especiales', estado: 'inactiva' }*/
  ];

  get categoriasFiltradas(): Categoria[] {
    if (this.filtroEstado === 'todos') {
      return this.categorias;
    }
    return this.categorias.filter(categoria => categoria.estado === this.filtroEstado);
  }
  

  filtrarCategorias(): void {
    // El filtrado se hace automáticamente con el getter categoriasFiltradas
  }

  onEstadoChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.filtroEstado = target.value;
  }

  activarEdicion(categoria: Categoria): void {
    categoria.editando = true;
  }

  guardarEdicion(categoria: Categoria): void {
    categoria.editando = false;
    // Aquí podrías agregar lógica para guardar en el backend si fuera necesario
  }

  eliminarCategoria(categoria: Categoria): void {
    this.categorias = this.categorias.filter(c => c !== categoria);
  }

  agregarCategoria(): void {
    const nuevoEstado: 'activa' | 'inactiva' =
      this.filtroEstado === 'todos' ? 'activa' : (this.filtroEstado as 'activa' | 'inactiva');
    const nuevaCategoria: Categoria = {
      nombre: '',
      descripcion: '',
      estado: nuevoEstado,
      editando: true
    };
    this.categorias.push(nuevaCategoria);
  }
}
