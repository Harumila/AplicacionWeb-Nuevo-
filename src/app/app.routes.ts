
import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { ProductosComponent } from './productos/productos';
import { DetalledeproductoComponent } from './detalledeproducto/detalledeproducto';
import { CategoriasComponent } from './categorias/categorias';
import { PedidosComponent } from './pedidos/pedidos';
import { ReportesComponent } from './reportes/reportes';
import { PagosComponent } from './pagos/pagos';
import { EstadisticasComponent } from './estadisticas/estadisticas';
import { MyadminComponent } from './myadmin/myadmin';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard/myadmin', pathMatch: 'full' },
  {
    path: 'dashboard', component: Dashboard,
    children: [
      { path: 'myadmin', component: MyadminComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'detalledeproducto', component: DetalledeproductoComponent },
      { path: 'categorias', component: CategoriasComponent },
      { path: 'pedidos', component: PedidosComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: 'pagos', component: PagosComponent },
      { path: 'estadisticas', component: EstadisticasComponent },
    ]

  },

];



