import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ReporteService} from '../services/reporte.services';


export interface ReporteItem {
  cantidad: number;
  descripcion: string;
  precio: number;
  categoria: string;
}

@Component({
  selector: 'app-reportes',
  imports: [CommonModule],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css'
})
export class ReportesComponent implements  OnInit {
  reporte: any;
  constructor(public reportService: ReporteService) {
  
    }
   ngOnInit(): void {
              this.reportService.ObtenerReporte().subscribe({
                next: (valores: any) => {
                  this.reporte = valores.content.map((a:any) => ({
                    cantidad: 2,
                    descripcion: 'Ramen de chancho',
                    precio: 30.00,
                    categoria: 'ramen'
                  } as ReporteItem));
                  this.filtrarReporte(); // Update filtered list after loading data
                },
                error: (error:any) => {
                  console.log("err", error)
                }
              });
            }
  filtrarReporte() {
    throw new Error('Method not implemented.');
  }
  filtroCategoria: string = 'todos';

  reporteItems: ReporteItem[] = [
    /*{ cantidad: 2, descripcion: 'Ramen de Pollo', precio: 25.00, categoria: 'ramen' },
    { cantidad: 1, descripcion: 'Coca Cola', precio: 8.00, categoria: 'bebida' },
    { cantidad: 3, descripcion: 'Mochi de Fresa', precio: 12.00, categoria: 'postre' },
    { cantidad: 1, descripcion: 'Onigiri de Salmón', precio: 15.00, categoria: 'snack' },
    { cantidad: 2, descripcion: 'Ramen de Cerdo', precio: 28.00, categoria: 'ramen' }*/
  ];

  get itemsFiltrados(): ReporteItem[] {
    if (this.filtroCategoria === 'todos') {
      return this.reporteItems;
    }
    return this.reporteItems.filter(item => item.categoria === this.filtroCategoria);
  }

  get total(): number {
    return this.itemsFiltrados.reduce((sum, item) => sum + (item.cantidad * item.precio), 0);
  }

  onCategoriaChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.filtroCategoria = target.value;
  }
}
