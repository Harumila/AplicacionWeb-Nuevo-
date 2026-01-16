import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../services/pedido.services';

export interface Pedido {
  nombre: string;
  producto: string;
  fecha: string;
  hora: string;
  estado: 'entregado' | 'proceso' | 'cancelado';
}

@Component({
  selector: 'app-pedidos',
  imports: [CommonModule],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class PedidosComponent implements  OnInit {
  constructor(public orderService: PedidoService) {
  
    }
  ngOnInit(): void {
              this.orderService.ObtenerPedido().subscribe({
                next: (valores: any) => {
                  this.pedidos = valores.content.map((a:any) => ({
                    nombre: 'Rosario Pérez',
                    producto: '2 ramen de pollo',
                    fecha: '03/01/26',
                     hora: '18:30',
                     estado: 'entregado'
                  } as Pedido));
                  this.filtrarPedido(); // Update filtered list after loading data
                },
                error: (error:any) => {
                  console.log("err", error)
                }
              });
            }
      filtrarPedido() {
          throw new Error('Method not implemented.');
  }
          filtroEstado: string = 'todos';


  pedidos: Pedido[] = [
    /*{
      nombre: 'Valeria Montes Ríos',
      producto: '2 MOCHIS<br>1 BEBIDA',
      fecha: '15/01/2025',
      hora: '11:45 a.m.',
      estado: 'entregado'
    },
    {
      nombre: 'Camila Herrera Delgado',
      producto: '1 RAMEN',
      fecha: '28/09/2025',
      hora: '08:30 a.m.',
      estado: 'proceso'
    },
    {
      nombre: 'Luciana Torres Guzmán',
      producto: '2 HELADOS<br>1 MOCHI',
      fecha: '25/08/2025',
      hora: '02:15 p.m.',
      estado: 'cancelado'
    },
    {
      nombre: 'Diego Ramírez Paredes',
      producto: '3 ONIGIRI<br>1 BEBIDA',
      fecha: '12/05/2025',
      hora: '06:00 p.m.',
      estado: 'entregado'
    },
    {
      nombre: 'Mateo Fernández Rojas',
      producto: '1 RAMEN<br>3 CORN DOG',
      fecha: '06/05/2025',
      hora: '09:20 p.m.',
      estado: 'proceso'
    }*/
  ];

  pedidosFiltrados: Pedido[] = this.pedidos;

  filtrarPedidos(): void {
    if (this.filtroEstado === 'todos') {
      this.pedidosFiltrados = this.pedidos;
    } else {
      this.pedidosFiltrados = this.pedidos.filter(pedido => pedido.estado === this.filtroEstado);
    }
  }

  onEstadoChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.filtroEstado = target.value;
    this.filtrarPedidos();
  }
}
