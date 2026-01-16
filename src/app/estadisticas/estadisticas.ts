import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables, ChartConfiguration, ChartType } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.css'
})
export class EstadisticasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('platillosChart') platillosCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('bubbleteaChart') bubbleteaCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('ventasChart') ventasCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('reservasChart') reservasCanvas!: ElementRef<HTMLCanvasElement>;

  charts: Chart[] = [];
  filtroTiempo: string = 'semana'; // semana, mes, anio

  // Colores (kawaii palette)
  colores = ["#f472b6", "#c084fc", "#9333ea", "#fb7185", "#38bdf8"];

  ngAfterViewInit(): void {
    this.renderCharts();
  }

  ngOnDestroy(): void {
    this.destruirCharts();
  }

  cambiarFiltro() {
    this.destruirCharts();
    this.renderCharts();
  }

  destruirCharts() {
    this.charts.forEach(chart => chart.destroy());
    this.charts = [];
  }

  renderCharts() {
    this.renderPlatillosChart();
    this.renderBubbleteaChart();
    this.renderVentasChart();
    this.renderReservasChart();
  }

  renderPlatillosChart() {
    const ctx = this.platillosCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    // Simular datos según filtro
    const data = this.obtenerDatosPlatillos();

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Kimbap", "Tonkatsu", "Tteokbokki", "Bibimbap"],
        datasets: [
          { label: "Ventas", data: data, backgroundColor: this.colores }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: { legend: { display: false }, title: { display: true, text: 'Top Platillos' } }
      }
    });
    this.charts.push(chart);
  }

  renderBubbleteaChart() {
    const ctx = this.bubbleteaCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const data = this.obtenerDatosBubbletea();

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ["Café", "Matcha", "Fruta", "Taro"],
        datasets: [{
          data: data,
          backgroundColor: this.colores
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
    this.charts.push(chart);
  }

  renderVentasChart() {
    const ctx = this.ventasCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
        datasets: [{
          label: "Ventas (S/.)",
          data: this.obtenerDatosVentas(),
          backgroundColor: "#f472b6",
          borderRadius: 5
        }]
      },
      options: { responsive: true }
    });
    this.charts.push(chart);
  }

  renderReservasChart() {
    const ctx = this.reservasCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
        datasets: [
          {
            label: "Reservas Online",
            data: this.obtenerDatosReservasA(),
            borderColor: this.colores[0],
            backgroundColor: this.colores[0],
            fill: false,
            tension: 0.3
          },
          {
            label: "Reservas Local",
            data: this.obtenerDatosReservasB(),
            borderColor: this.colores[2],
            backgroundColor: this.colores[2],
            fill: false,
            tension: 0.3
          }
        ]
      },
      options: { responsive: true }
    });
    this.charts.push(chart);
  }

  // Métodos simulados para variar datos según filtro
  obtenerDatosPlatillos(): number[] {
    if (this.filtroTiempo === 'mes') return [120, 80, 150, 200];
    if (this.filtroTiempo === 'anio') return [1500, 1200, 1800, 2500];
    return [20, 10, 15, 25]; // semana
  }

  obtenerDatosBubbletea(): number[] {
    if (this.filtroTiempo === 'mes') return [30, 45, 120, 60];
    return [15, 22, 62, 20];
  }

  obtenerDatosVentas(): number[] {
    if (this.filtroTiempo === 'mes') return [300, 450, 320, 500]; // Por semana
    return [150, 230, 180, 320, 290, 400, 380]; // Por día
  }

  obtenerDatosReservasA(): number[] {
    if (this.filtroTiempo === 'mes') return [50, 70, 60, 90];
    return [10, 25, 15, 30];
  }

  obtenerDatosReservasB(): number[] {
    if (this.filtroTiempo === 'mes') return [80, 60, 90, 100];
    return [20, 15, 28, 40];
  }
}
