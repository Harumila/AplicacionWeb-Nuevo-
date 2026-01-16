import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../services/producto.services';

 export interface Producto {
  imagen: string;
  nombre: string;
  precio: number;
  categoria: 'ramen' | 'bebida' | 'snack' | 'postre';
  editando?: boolean;
}

@Component({
  selector: 'app-productos',
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class ProductosComponent implements  OnInit {
  constructor(public productService: ProductoService) {
  
    }
    ngOnInit(): void {
        this.productService.ObtenerProducto().subscribe({
          next: (valores: any) => {
            this.productos = valores.content.map((a:any) => ({
              imagen: 'assets/img/ramen4.png',
              nombre: a.name,
              precio: 15,
              categoria: "ramen",
              editando: false
            } as Producto));
            this.filtrarProductos(); // Update filtered list after loading data
          },
          error: (error:any) => {
            console.log("err", error)
          }
        });
      }
      filtroEstado: string = 'todos';

  productos: Producto[] = [
    /*{
      imagen: 'img/ramen2.png',
      nombre: 'Ramen de cerdo',
      precio: 15.00,
      categoria: 'ramen'
    },
    {
      imagen: 'img/ramen2.png',
      nombre: 'Ramen de cerdo',
      precio: 15.00,
      categoria: 'ramen'
    },
    {
      imagen: 'img/ramen3.png',
      nombre: 'Ramen de Ramion',
      precio: 15.00,
      categoria: 'ramen'
    },
    {
      imagen: 'img/ramen1.png',
      nombre: 'Bibimpap',
      precio: 15.00,
      categoria: 'ramen'
    },
    {
      imagen: 'img/ramen4.png',
      nombre: 'Coca Cola',
      precio: 4.50,
      categoria: 'bebida'
    },
    {
      imagen: 'img/ramen4.png',
      nombre: 'Fanta',
      precio: 4.00,
      categoria: 'bebida'
    },
    {
      imagen: 'img/ramen1.png',
      nombre: 'Mochi de Fresa',
      precio: 6.00,
      categoria: 'postre'
    },
    {
      imagen: 'img/ramen3.png',
      nombre: 'Onigiri de Salmón',
      precio: 8.50,
      categoria: 'snack'
    }*/
  ];

  filtroCategoria: string = 'todos';
  productosFiltrados: Producto[] = this.productos;

  filtrarProductos(): void {
    if (this.filtroCategoria === 'todos') {
      this.productosFiltrados = this.productos;
    } else {
      this.productosFiltrados = this.productos.filter(producto => producto.categoria === this.filtroCategoria);
    }
  }

  onCategoriaChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.filtroCategoria = target.value;
    this.filtrarProductos();
  }

  activarEdicion(producto: Producto): void {
    producto.editando = true;
  }

  guardarEdicion(producto: Producto): void {
    producto.editando = false;
  }

  eliminarProducto(producto: Producto): void {
    this.productos = this.productos.filter(p => p !== producto);
    this.filtrarProductos();
  }

  agregarProducto(): void {
    const nuevaCategoria = (this.filtroCategoria !== 'todos') 
      ? this.filtroCategoria as 'ramen' | 'bebida' | 'snack' | 'postre' 
      : 'ramen'; // Default category

    const nuevoProducto: Producto = {
      imagen: 'img/logo.png', // Placeholder image
      nombre: '',
      precio: 0,
      categoria: nuevaCategoria,
      editando: true
    };

    this.productos.push(nuevoProducto);
    this.filtrarProductos();
  }

  onFileSelected(event: any, producto: Producto): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        producto.imagen = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}

