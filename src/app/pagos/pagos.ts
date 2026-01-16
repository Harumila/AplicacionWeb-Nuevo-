import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagoService } from '../services/pago.services';

export interface Pago {
  id: number;
  nombre: string;
  monto: number;
  metodoPago: 'Yape' | 'Efectivo' | 'Tarjeta';
  fecha: string;
  estado: 'Completado' | 'Pendiente' | 'Fallido';
  editando?: boolean;
}

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagos.html',
  styleUrl: './pagos.css'
})
export class PagosComponent implements  OnInit {
  constructor(public paymentService: PagoService) {
  
    }

    ngOnInit(): void {
            this.paymentService.ObtenerPago().subscribe({
              next: (valores: any) => {
                this.pagos = valores.content.map((a:any) => ({
                  id: 1,
                  nombre: 'Rosalía Rodriguez',
                  monto: 20.00,
                  metodoPago: 'Yape',
                  fecha: '12/12/25',
                  estado: 'Completado',
                  editando: false
                } as Pago));
                this.filtrarPago(); // Update filtered list after loading data
              },
              error: (error:any) => {
                console.log("err", error)
              }
            });
          }
  filtrarPago() {
    throw new Error('Method not implemented.');
  }
          filtroEstado: string = 'todos';

  pagos: Pago[] = [
   /* { id: 1, nombre: 'Valentina Soto Morales', monto: 120.00, metodoPago: 'Yape', fecha: '2023-10-26', estado: 'Completado' },
    { id: 2, nombre: 'Luna Torres Aguilar', monto: 80.00, metodoPago: 'Efectivo', fecha: '2023-10-25', estado: 'Completado' },
    { id: 3, nombre: 'Iker Paredes Navarro', monto: 95.00, metodoPago: 'Yape', fecha: '2023-10-24', estado: 'Pendiente' },
    { id: 4, nombre: 'Dylan Silva Paredes', monto: 57.00, metodoPago: 'Yape', fecha: '2023-10-23', estado: 'Completado' },
    { id: 5, nombre: 'Zoe Castillo Rodríguez', monto: 64.00, metodoPago: 'Efectivo', fecha: '2023-10-22', estado: 'Fallido' },
    { id: 6, nombre: 'Emma Vargas Salazar', monto: 31.00, metodoPago: 'Efectivo', fecha: '2023-10-21', estado: 'Completado' },
    { id: 7, nombre: 'Liam Estrada Barrios', monto: 47.00, metodoPago: 'Yape', fecha: '2023-10-20', estado: 'Completado' }*/
  ]

  nuevoPago: Pago | null = null;

  toggleEdicion(pago: Pago): void {
    pago.editando = !pago.editando;
  }

  eliminarPago(id: number): void {
    if (confirm('¿Estás seguro de eliminar este pago?')) {
      this.pagos = this.pagos.filter(p => p.id !== id);
    }
  }

  iniciarNuevoPago(): void {
    this.nuevoPago = {
      id: this.pagos.length + 1,
      nombre: '',
      monto: 0,
      metodoPago: 'Efectivo',
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Pendiente'
    };
  }

  guardarNuevoPago(): void {
    if (this.nuevoPago && this.nuevoPago.nombre) {
      this.pagos.push(this.nuevoPago);
      this.nuevoPago = null;
    }
  }

  cancelarNuevoPago(): void {
    this.nuevoPago = null;
  }

  descargarComprobante(pago: Pago): void {
    alert(`Descargando comprobante para ${pago.nombre}`);
  }
}
