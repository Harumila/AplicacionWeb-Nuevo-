import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetalleService } from '../services/detalleproducto.services';

export interface DetalleProducto {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  ingredientes: string[];
}

@Component({
  selector: 'app-detalledeproducto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalledeproducto.html',
  styleUrl: './detalledeproducto.css'
})
export class DetalledeproductoComponent  implements  OnInit {
  detalleproducto: any;
  constructor(public productdetailService: DetalleService) {
  
    }
  ngOnInit(): void {
              this.productdetailService.ObtenerDetalle().subscribe({
                next: (valores: any) => {
                  this.detalleproducto = valores.content.map((a:any) => ({
                   nombre: 'ramen de cerdo',
                   descripcion: 'El ramen de cerdo, conocido como Tonkotsu Ramen, es una sopa japonesa hecha con un caldo espeso y cremoso preparado a base de huesos de cerdo cocidos por horas. Se acompaña fideos, carne de cerdo (chashu), huevo marinado y cebolla china, ofreciendo un sabor profundo y reconfortante.',
                   precio: 15.00,
                   imagen: 'img/ramen1.png', // Assuming relative path works or needs assets/
                   ingredientes: ['Fideos', 'Carne de cerdo (chashu)', 'Huevo marinado', 'Cebolla china', 'Caldo de huesos']
                  } as DetalleProducto));
                  this.filtrarDetalleProducto(); // Update filtered list after loading data
                },
                error: (error:any) => {
                  console.log("err", error)
                }
              });
            }
    filtrarDetalleProducto() {
      throw new Error('Method not implemented.');
    }
            filtroEstado: string = 'todos';
  
  producto: DetalleProducto = {
    nombre: 'ramen de cerdo',
    descripcion: 'El ramen de cerdo, conocido como Tonkotsu Ramen, es una sopa japonesa hecha con un caldo espeso y cremoso preparado a base de huesos de cerdo cocidos por horas. Se acompaña fideos, carne de cerdo (chashu), huevo marinado y cebolla china, ofreciendo un sabor profundo y reconfortante.',
    precio: 15.00,
    imagen: 'img/ramen1.png', // Assuming relative path works or needs assets/
    ingredientes: ['Fideos', 'Carne de cerdo (chashu)', 'Huevo marinado', 'Cebolla china', 'Caldo de huesos']
  };

  editando: boolean = false;
  nuevoIngrediente: string = '';

  activarEdicion(): void {
    this.editando = true;
  }

  guardarCambios(): void {
    this.editando = false;
    // Aquí iría la lógica para llamar al servicio y guardar en backend
    console.log('Cambios guardados:', this.producto);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.producto.imagen = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  agregarIngrediente(): void {
    if (this.nuevoIngrediente.trim()) {
      this.producto.ingredientes.push(this.nuevoIngrediente.trim());
      this.nuevoIngrediente = '';
    }
  }

  eliminarIngrediente(index: number): void {
    this.producto.ingredientes.splice(index, 1);
  }
}
